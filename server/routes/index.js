var express = require('express');
var router  = express.Router();
var fs      = require('fs');
/* GET home page. */
var util  = require('util');
var spawn = require('child_process').spawn;
router.get('/', function (req, res, next) {
    res.render('../../client/dist/index.html');
});
router.get('/getIconfig', function (req, res, next) {
    fs.readFile('iconfig.json', 'utf8', function (err, data) {
        res.send(data);
    });
});
router.post('/sendJson', function (req, res, next) {
    if ( isJson(JSON.stringify(req[ 'body' ])) ) {
        fs.writeFile('iconfig.json', JSON.stringify(req[ 'body' ]), function (err) {
            console.log(err);
        });
        fs.writeFile('../demo/ionic-template-1/src/assets/iconfig.json', JSON.stringify(req[ 'body' ]), function (err) {
            console.log(err);
        });
        fs.writeFile('../demo/ionic-template-1/www/assets/iconfig.json', JSON.stringify(req[ 'body' ]), function (err) {
            console.log(err);
        });
        res.send("Changes saved.");
    } else {
        res.send("invalid");
    }
});
router.get('/downloadApk', function (req, res, next) {
    ionicBuildApk();
    next();
}, function (req, res, next) {
    res.send('android build in progress....');
    res.end('ended')
});
function ionicBuildApk() {
    var ionicbuild = spawn('ionic', [ 'build', '--release', 'android' ], {
        cwd     : '../demo/ionic-template-1/',
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
    ionicbuild.on('exit', (code) => {
        console.log('ionic build finished');
        ionicbuild.stdin.end();
        ionicbuild.stdout.end();
        keytool();
    });
}
function jarSigner() {
    var jarSignerArray = [];
    var jarsigner      = spawn('jarsigner', [ '-verbose', '-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', 'newrel.keystore', 'android-release-unsigned.apk', 'newalias' ], {
        cwd     : '../demo/ionic-template-1/platforms/android/build/outputs/apk',
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
            jarsigner.stdin.write('123456789\n');
            // setTimeout(zipalign, 6000);
        }
    });
    jarsigner.stdin.on('data', function (data) {
        console.log('JARSIGNER STDIN: ' + data.toString());
    });
    jarsigner.on('exit', (code) => {
        console.log('jarsigner ended');
        zipalign();
    })
}
function keytool() {
    var stringArray = [];
    var keytool     = spawn('keytool', [ '-genkey', '-v', '-keystore', 'newrel.keystore', '-alias', 'newalias', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000' ], {
        cwd     : '../demo/ionic-template-1/platforms/android/build/outputs/apk',
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
            keytool.stdin.write('123456789\n');
        } else if ( dataToString == stringArray[ 1 ] ) {
            keytool.stdin.write('123456789\n');
        } else if ( dataToString == stringArray[ 2 ] ) {
            keytool.stdin.write('Abbas Baydoun\n');
        } else if ( dataToString == stringArray[ 3 ] ) {
            keytool.stdin.write('A TEAM\n');
        } else if ( dataToString == stringArray[ 4 ] ) {
            keytool.stdin.write('AUB\n');
        } else if ( dataToString == stringArray[ 5 ] ) {
            keytool.stdin.write('Beirut\n');
        } else if ( dataToString == stringArray[ 6 ] ) {
            keytool.stdin.write('Beirut\n');
        } else if ( dataToString == stringArray[ 7 ] ) {
            keytool.stdin.write('LB\n');
        } else if ( dataToString == stringArray[ 8 ] ) {
            keytool.stdin.write('yes\n');
        } else if ( dataToString == stringArray[ 9 ] ) {
            keytool.stdin.write('123456789\n');
        } else if ( dataToString == stringArray[ 10 ] ) {
            keytool.stdin.write('123456789\n');
            // setTimeout(jarSigner, 3000);
        }
    });
    keytool.on('exit', (code) => {
        console.log('keytool end');
        keytool.stdin.end();
        keytool.stdout.end();
        jarSigner();
    });
}
function zipalign() {
    var zipalignArray = [];
    console.log('started zipalign');
    var zipalign = spawn('/Users/abedzantout/Library/Android/sdk/build-tools/25.0.0/zipalign', [ '-v', '4', 'android-release-unsigned.apk', 'AndroidRelease.apk' ], {
        cwd     : '../demo/ionic-template-1/platforms/android/build/outputs/apk',
        detached: true
    });
    zipalign.stdout.on('data', function (data) {
        console.log('zipalign STDOUT: ' + data.toString());
    });
    zipalign.stderr.on('data', function (data) {
        var jarsignerToArray = data.toString();
        console.log('zipalign STDERR: ' + data.toString());
        zipalignArray.push(jarsignerToArray);
        // if ( jarsignerToArray == zipalign[ 0 ] ) {
        //     zipalign.stdin.write('123456789\n');
        // }
    });
    zipalign.stdin.on('data', function (data) {
        console.log('zipalign STDIN: ' + data.toString());
    });
    zipalign.on('close', () => {
        zipalign.stdin.end();
    })
}
function puts(error, stdout, stderr) {
    if ( error ) {
        console.log(error);
    }
    console.log(stdout);
    console.log(stderr);
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
