var express = require('express');
var router  = express.Router();

var fs = require('fs');

router.post('/register', function (req, res, next) {

    var name     = req.body[ 'name' ];
    var email    = req.body[ 'email' ];
    var password = req.body[ 'password' ];
    var isDeveloper = req.body['isDeveloper'];



    fs.readFile('../database/users.json', 'utf8', (err, data) => {
        console.log(err);
        let usersArray = JSON.parse(data);

        if ( usersArray[ email ] === undefined ) {
            let newUser = {
                [email]: {
                    name    : name,
                    password: password,
                    isDeveloper: isDeveloper
                }
            };
            usersArray.push(newUser);
            fs.writeFile('../database/users.json', JSON.stringify(usersArray), (err) => {
                console.log(err);
                res.send({success: true});
            });
        } else {
            res.send({success: false});
        }
    });

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
    fs.readFile('../database/users.json', 'utf8', (err, data) => {
        let usersArray = JSON.parse(data);
        let userObject = null;
        for ( let i = 0; i < usersArray.length; i++ ) {
            if ( Object.keys(usersArray[ i ])[ 0 ] === email ) {
                userObject = usersArray[ i ][ email ];
            }
        }
        if ( userObject != null ) {

            // email exists
            if ( userObject[ 'password' ] === password ) {

                console.log("SENDING RESPONSE ...");
                res.send('{"success": "true", "isDeveloper":'+userObject['isDeveloper']+'}');
            }
        } else {
            res.send('{"success": false}');
        }
    });

});
module.exports = router;
