var express = require('express');
var router  = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('../../client/dist/index.html');
});
router.get('/getIconfig', function (req, res, next) {
    fs.readFile('iconfig.json', 'utf8', (err, data)=> {
        res.send(data);
    });
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

router.post('/sendJson', function (req, res, next) {


    if(isJson(JSON.stringify(req['body']))) {

        fs.writeFile('iconfig.json', JSON.stringify(req['body']), function (err) {
            console.log(err);
        });

        fs.writeFile('../demo/ionic-template-1/src/assets/iconfig.json', JSON.stringify(req['body']), function (err) {
            console.log(err);
        });
        fs.writeFile('../demo/ionic-template-1/www/assets/iconfig.json', JSON.stringify(req['body']), function (err) {
            console.log(err);
        });

        res.send("Changes saved.");

    }else{

        res.send("invalid");

    }
});
module.exports = router;
