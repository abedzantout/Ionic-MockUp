var express = require('express');
var router  = express.Router();
var fs      = require('fs');
/* GET home page. */
var util           = require('util');
var spawn          = require('child_process').spawn;
var terminal       = require('child_process').spawn('/bin/sh');
var ionicPort      = 8000;
var devLoggerPort  = 53700;
var liveReloadPort = 35720;
router.get('/', function (req, res, next) {
    res.render('../../client/dist/index.html');
});
router.get('/getIconfig/:templateName', function (req, res, next) {
    ionicPort += 1;
    devLoggerPort += 1;
    liveReloadPort += 1;
    if ( !terminal[ 'killed' ] == true ) {
        terminal.kill('SIGKILL');
    }
    if ( terminal[ 'killed' ] == true || terminal == null || terminal == undefined ) {
        terminal = require('child_process').spawn('/bin/sh');
        console.log("CREATED NEW TERMINAL PROCESS");
    }
    let templateName = req.params[ 'templateName' ];
    fs.readFile('mapping.json', 'utf8', function (err, data) {
        let obj = JSON.parse(data);
        let id  = obj[ templateName ][ 'id' ];
        terminal.stdout.on('data', function (data) {
            console.log('STDOUT: ' + data);
            if ( data.includes('dev server running: http://localhost:') ) {
                let id = obj[ templateName ][ 'id' ];
                fs.readFile('../ionic-templates/' + id + '/application/src/assets/iconfig.json', 'utf8', function (err, data) {
                    res.send(data);
                });
            }
        });
        terminal.stderr.on('data', function (data) {
            console.log('STDERR: ' + data);
        });
        terminal.stdin.write("cd ../ionic-templates/" + id + "/application && ionic serve -p " + ionicPort + " -r " + liveReloadPort + " --nobrowser -- nolivereload --dev-logger-port " + devLoggerPort + "\n");
    });
});
router.get('/ionicPort', function (req, res, next) {
    res.send(ionicPort.toString());
});
router.get('/endTerminal', function (req, res, next) {
    terminal.kill('SIGKILL');
    console.log("TERMINAL PROCESS KILLED.");
    res.send("done");
});
router.post('/sendJson', function (req, res, next) {
    let data = req[ 'body' ];
    console.log(Object.keys(data));
    let templateName = Object.keys(data)[ 0 ];
    let id           = 0;
    fs.readFile('mapping.json', 'utf8', function (err, data) {
        let obj = JSON.parse(data);
        id      = obj[ templateName ][ 'id' ];
    });
    if ( isJson(JSON.stringify(req[ 'body' ])) ) {
        fs.writeFile('../ionic-templates/' + id + '/application/src/assets/iconfig.json', JSON.stringify(req[ 'body' ]), function (err) {
            console.log(err);
        });
        fs.writeFile('../ionic-templates/' + id + '/application/www/assets/iconfig.json', JSON.stringify(req[ 'body' ]), function (err) {
            console.log(err);
        });
        res.send("Changes saved.");
    } else {
        res.send("invalid");
    }
});
router.post('/downloadApk', function (req, res, next) {
    console.log(req[ 'body' ]);
    let keyPassword        = req[ 'body' ][ 'keyPassword' ];
    let authorsName        = req[ 'body' ][ 'authorsName' ];
    let organizationalUnit = req[ 'body' ][ 'organizationalUnit' ];
    let organizationName   = req[ 'body' ][ 'organizationName' ];
    let cityName           = req[ 'body' ][ 'cityName' ];
    let stateName          = req[ 'body' ][ 'stateName' ];
    let countryCode        = req[ 'body' ][ 'countryCode' ];
    let applicationName    = req[ 'body' ][ 'application-name' ];
    // keytool(keyPassword, authorsName, organizationalUnit, organizationName, cityName, stateName, countryCode,  () =>{
    let callback           = function () {
        // res.set('Content-disposition', 'attachment; filename=AndroidRelease.apk');
        // res.set('Content-Type', 'application/octet-stream');
        // res.download('../ionic-templates/0/application/platforms/android/build/outputs/apk/Restaurant Review.apk', 'Restaurant Review.apk');
        console.log('response is being sent');
        res.send('success');
    };
    ionicBuildApk(keyPassword, authorsName, organizationalUnit, organizationName, cityName, stateName, countryCode, applicationName, () => {
        console.log('ionic successfully built android application');
        callback();
        // res.send('success');
    });
});
router.get('/getAPK', function (req, res, next) {
    res.set('Content-disposition', 'attachment; filename=Restaurant Review.apk');
    res.set('Content-Type', 'application/vnd.android.package-archive');
    res.download('../ionic-templates/0/application/platforms/android/build/outputs/apk/Restaurant Review.apk', 'Restaurant Review.apk');
});
function ionicBuildApk(keyPassword, authorsName, organizationalUnit, organizationName, cityName, stateName, countryCode, applicationName, ionicBuildCallback) {
    var ionicbuild = spawn('ionic', [ 'build', '--release', 'android' ], {
        cwd     : '../ionic-templates/0/application',
        detached: true
    });
    ionicbuild.stdout.on('data', function (data) {
        console.log('ionicbuild STDOUT: ' + data.toString());
    });
    ionicbuild.stderr.on('data', function (data) {
        console.log('ionicbuild stderr' + data.toString());
    });
    ionicbuild.stdin.on('data', function (data) {
        console.log('ionicbuild STDIN: ' + data.toString());
    });
    ionicbuild.on('close', (code) => {
        console.log('ionic build finished');
        ionicbuild.stdin.end();
        ionicbuild.stdout.end();
        keytool(keyPassword, authorsName, organizationalUnit, organizationName, cityName, stateName, countryCode, applicationName, () => {
            ionicBuildCallback();
        });
    });
}
function jarSigner(keyPassword, applicationName, jarSignerCallback) {
    var jarSignerArray = [];
    var jarsigner      = spawn('jarsigner', [ '-verbose', '-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', 'newrel.keystore', 'android-release-unsigned.apk', 'newalias' ], {
        cwd     : '../ionic-templates/0/application/platforms/android/build/outputs/apk',
        detached: true
    });
    jarsigner.stdout.on('data', function (data) {
        console.log('JARSIGNER STDOUT: ' + data.toString());
    });
    jarsigner.stderr.on('data', function (data) {
        var jarsignerToArray = data.toString();
        console.log('JARSIGNER STDERR: ' + data.toString());
        jarSignerArray.push(jarsignerToArray);
        if ( jarsignerToArray == jarSignerArray[ 0 ] ) {
            jarsigner.stdin.write(keyPassword + '\n');
            // setTimeout(zipalign, 6000);
        }
    });
    jarsigner.stdin.on('data', function (data) {
        console.log('JARSIGNER STDIN: ' + data.toString());
    });
    jarsigner.on('close', (code) => {
        console.log('jarsigner ended');
        zipalign(applicationName, () => {
            jarSignerCallback();
        });
    })
}
function keytool(keyPassword, authorsName, organizationalUnit, organizationName, cityName, stateName, countryCode, applicationName, keytoolCallback) {
    var stringArray = [];
    var keytool     = spawn('keytool', [ '-genkey', '-v', '-keystore', 'newrel.keystore', '-alias', 'newalias', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000' ], {
        cwd     : '../ionic-templates/0/application/platforms/android/build/outputs/apk',
        detached: true
    });
    keytool.stdout.on('data', function (data) {
        console.log('stdout keytool: ' + data.toString());
    });
    keytool.stdin.on('data', function (data) {
        console.log('stdin keytool: ' + data.toString());
    });
    /**
     * Enters the user information
     * @param: 0- Enter keystore password?
     * @param: 1- Re-enter new password?
     * @param: 2-  What is your first and last name?
     * @param: 3- What is the name of your organizational unit?
     * @param: 4- What is the name of your organization?
     * @param: 5- What is the name of your City or Locality?
     * @param: 6- What is the name of your State or Province?
     * @param: 7- What is the two-letter country code for this unit?
     *
     * @param: 8- (CN= param2, OU=param3, O=param4, L=param5, ST=param6, C=param7 correct)? yes: no? proceed: repeat
     *
     * @returns: Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days for: CN= param2, OU=param3, O=param4, L=param5, ST=param6 C=param7
     *
     * @param: 9- Enter key password for <appliaction_name>
     * @param: 10- ReEnter password
     */
    keytool.stderr.on('data', function (data) {
        console.log("STDERR: " + data.toString());
        var dataToString = data.toString();
        stringArray.push(dataToString);
        if ( dataToString == stringArray[ 0 ] ) {
            console.log('at 0' + dataToString);
            keytool.stdin.write(keyPassword + '\n');
        } else if ( dataToString == stringArray[ 1 ] ) {
            keytool.stdin.write(keyPassword + '\n');
        } else if ( dataToString == stringArray[ 2 ] ) {
            keytool.stdin.write(authorsName + '\n');
        } else if ( dataToString == stringArray[ 3 ] ) {
            keytool.stdin.write(organizationalUnit + '\n');
        } else if ( dataToString == stringArray[ 4 ] ) {
            keytool.stdin.write(organizationName + '\n');
        } else if ( dataToString == stringArray[ 5 ] ) {
            keytool.stdin.write(cityName + '\n');
        } else if ( dataToString == stringArray[ 6 ] ) {
            keytool.stdin.write(stateName + '\n');
        } else if ( dataToString == stringArray[ 7 ] ) {
            keytool.stdin.write(countryCode + '\n');
        } else if ( dataToString == stringArray[ 8 ] ) {
            keytool.stdin.write('yes\n');
        } else if ( dataToString == stringArray[ 9 ] ) {
            setTimeout(() => {keytool.stdin.write(keyPassword + '\n');}, 2000);
        } else if ( dataToString == stringArray[ 10 ] ) {
            console.log('AT 100000000000' + dataToString);
            setTimeout(() => {keytool.stdin.write(keyPassword + '\n');}, 2000);
            // setTimeout(jarSigner, 3000);
        }
    });
    keytool.on('close', (code) => {
        console.log('keytool end');
        keytool.stdin.end();
        keytool.stdout.end();
        jarSigner(keyPassword, applicationName, () => {
            keytoolCallback();
        });
    });
}
function zipalign(applicationName, callback) {
    var zipalignArray = [];
    console.log('started zipalign');
    var zipalign = spawn('/Users/abedzantout/Library/Android/sdk/build-tools/25.0.0/zipalign', [ '-v', '4', 'android-release-unsigned.apk', applicationName + '.apk' ], {
        cwd     : '../ionic-templates/0/application/platforms/android/build/outputs/apk',
        detached: true
    });
    zipalign.stdout.on('data', function (data) {
        console.log('zipalign STDOUT: ' + data.toString());
    });
    zipalign.stderr.on('data', function (data) {
        var jarsignerToArray = data.toString();
        console.log('zipalign STDERR: ' + data.toString());
        zipalignArray.push(jarsignerToArray);
    });
    zipalign.stdin.on('data', function (data) {
        console.log('zipalign STDIN: ' + data.toString());
    });
    zipalign.on('close', () => {
        zipalign.stdin.end();
        console.log('zipalign complete');
        callback();
    })
}
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
module.exports = router;

