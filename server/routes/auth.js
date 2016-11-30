var express = require('express');
var router        = express.Router();
// var jwtDecode     = require('jwt-decode');
// var CryptoJS      = require("crypto-js");
// var bcrypt        = require('bcryptjs');
// var base64url     = require('base64-url');

var fs = require('fs');

var users = require('users.json');


// var MongoClient   = require("mongodb").MongoClient;
// var url           = "mongodb://abedzantout:mkdbpassword69@ds059306.mlab.com:59306/heroku_bdc2vm3k";

var signedToken;


router.post('/register', function(req, res, next) {

    console.log(req);
    console.log("SERVER CALLED!!!!!");

    var name        = req.body[ 'name' ];
    var email       = req.body[ 'email' ];
    var password    = req.body[ 'password' ];
    var data        = {};
    var success     = false;

    let appendObject = function(obj){
        var usersJson = fs.readFileSync('users.json');
        var users = JSON.parse(usersJson);
        users.push(obj);
        var usersJsonString = JSON.stringify(config);
        fs.writeFileSync('users.json', usersJsonString);
    };

    if(users[email] === undefined) {

        let newUser = {
            email: {
                name    : name,
                password: password
            }
        };

        appendObject(newUser);

        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            console.log(err);
            console.log("done!");
            res.send({success: true});
        });

    }else{
        console.log("failed!");
        res.send({success: false});
    }



    // sign up to database
    // MongoClient.connect(url, (err, db) => {
    //     var collection = db.collection('users');
    //     collection.find({"Email": email}).toArray((err, docs) => {
    //         data = docs[ 0 ];
    //         if ( err ) throw err;
    //         if ( data === undefined ) {
    //             bcrypt.genSalt(10, (err, salt) => {
    //                 bcrypt.hash(password, salt, (err, hash) => {
    //                     var token = "";
    //                     require('crypto').randomBytes(48, (err, buffer) => {
    //                         token = buffer.toString('hex');
    //                         collection.insertOne({
    //                             "Name"       : name,
    //                             "Email"      : email,
    //                             "Password"   : hash,
    //                             "Salt"       : salt,
    //                             "isConfirmed": "false",
    //                             "signupToken": token
    //                         });
    //                         success         = true;
    //                         isConfirmed     = false;
    //                         var transporter = nodemailer.createTransport({
    //                             host: 'smtpout.asia.secureserver.net',
    //                             port: 465,
    //                             auth: {
    //                                 user: 'ranizahr@monopolykings.com',
    //                                 pass: 'Abed&AbbasAre#1'
    //                             }
    //                         });
    //                         var mailOptions = {
    //                             from   : 'ranizahr@monopolykings.com', // sender address
    //                             to     : email, // list of receivers
    //                             subject: 'RESPONSE REQUIRED: Please confirm your request for information', // Subject line
    //                             html   : `<p>Hey ` + getFirstName(name)  +`, </p>
    //                                     <p>please <b><a href="http://monopolykings.com/confirm/` + token + `">CLICK HERE</a></b> to confirm your membership and access our real estate investment intelligence platform.</p>
    //                                     <p>Also please feel free to visit my <a href="http://www.ranizahr.com">blog</a>, where you can find Dubai specific investment strategies, articles, and so much more.</p>
    //                                     <p>Regards</p>
    //                                     <p>Rani Zahr</p>
    //
    //                                     <p>PS: if you did received this email by mistake, please disregard it</p>`
    //                             //uncomment for development
    //                             // text   : 'Hello, click the following link to confirm your account, http://localhost:4000/confirm/' + token
    //                             // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    //                         };
    //                         transporter.sendMail(mailOptions, function (error, info) {
    //                             if ( error ) {
    //                                 console.log(error);
    //                                 success     = false;
    //                                 isConfirmed = false;
    //                                 res.send('{"success":"' + success + '"}');
    //                             } else {
    //                                 console.log('Message sent: ' + info.response);
    //                                 success     = true;
    //                                 isConfirmed = false;
    //                                 res.send('{"success":"' + success + '"}');
    //                                 mailchimp.batch({
    //                                     method: 'post',
    //                                     path  : '/lists/0b0a823967/members',
    //                                     body  : {
    //                                         email_address: email,
    //                                         merge_fields : {
    //                                             FNAME: getFirstName(name),
    //                                             LNAME: getLastName(name)
    //                                         },
    //                                         status       : 'subscribed'
    //                                     },
    //                                 }, function (err, result) {
    //                                     if ( err ) throw err;
    //                                     console.log(result);
    //                                 });
    //                             }
    //                         });
    //                     });
    //                 });
    //             });
    //         }
    //         else if ( data !== undefined ) {
    //             console.log("USER ALREADY EXISTS");
    //             if ( data[ 'isConfirmed' ] === 'false' ) {
    //                 success     = false;
    //                 isConfirmed = false;
    //                 res.send('{"success":"' + success + '", "isConfirmed":"' + isConfirmed + '"}');
    //             }
    //             else if ( data[ 'isConfirmed' ] === 'true' ) {
    //                 success     = false;
    //                 isConfirmed = true;
    //                 res.send('{"success":"' + success + '", "isConfirmed":"' + isConfirmed + '"}');
    //             }
    //         }
    //     });
    // });


});


router.post('/authenticate', function (req, res, next) {
    /**
     *  @connect to database
     *  @get: user according to filled email and password
     *  @return: success or failure
     *  @callback: generate a token that includes all of the user data and return it with success=true
     *  @callback: if success, generate a token that includes all of the user data and return it with success=true
     *  @callback: f failure, return success=false
     */

    var email    = req.body[ 'email' ];
    var password = req.body[ 'password' ];
    var data     = {};

    // authenticate from database

    // MongoClient.connect(url, function (err, db) {
    //     var success     = false;
    //     var isConfirmed = false;
    //     var collection  = db.collection('users');
    //     collection.find({"Email": email}).toArray(function (err, docs) {
    //         data = docs[ 0 ];
    //         console.log(data);
    //         if ( data == undefined ) {
    //             res.send('{"success":"' + success + '"}');
    //             return;
    //         }
    //         var dbIsConfirmed = data[ 'isConfirmed' ];
    //         if ( data !== undefined && dbIsConfirmed === 'true' ) {
    //             var dbHashedPassword     = data[ "Password" ];
    //             var dbHashedPasswordSalt = data[ "Salt" ];
    //             bcrypt.hash(password, dbHashedPasswordSalt, (err, localPasswordHashedWithDbSalt) => {
    //                 if ( localPasswordHashedWithDbSalt == dbHashedPassword ) {
    //                     var header        = {
    //                         "alg": "HS256",
    //                         "typ": "JWT"
    //                     };
    //                     var encodedHeader = base64url.encode(JSON.stringify(header));
    //                     var encodedData   = base64url.encode(JSON.stringify(data));
    //                     var encodedString = encodedHeader + "." + encodedData;
    //                     var hash          = CryptoJS.HmacSHA256(encodedString, "secret");
    //                     var hashInBase64  = CryptoJS.enc.Base64.stringify(hash);
    //                     signedToken       = encodedString + "." + hashInBase64;
    //                     success           = true;
    //                     isConfirmed       = true;
    //                     res.send('{"success":"' + success + '", "auth_token":"' + signedToken + '", "isConfirmed":"' + isConfirmed + '"}');
    //                 } else {
    //                     success     = false;
    //                     isConfirmed = false;
    //                     res.send('{"success":"' + success + '", "auth_token":"' + signedToken + '", "isConfirmed":"' + isConfirmed + '"}');
    //                 }
    //             });
    //         }
    //         else if ( data !== undefined && dbIsConfirmed === 'false' ) {
    //             success     = true;
    //             isConfirmed = false;
    //             res.send('{"success":"' + success + '", "isConfirmed":"' + isConfirmed + '"}');
    //         }
    //         else {
    //             success     = false;
    //             isConfirmed = false;
    //             res.send('{"success":"' + success + '", "auth_token":"' + signedToken + '", "isConfirmed":"' + isConfirmed + '"}');
    //         }
    //         db.close();
    //         //
    //     });
    // });
});

