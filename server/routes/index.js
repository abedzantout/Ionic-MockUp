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
router.post('/sendJson', function (req, res, next) {
    fs.writeFile('iconfig.json', JSON.stringify(req[ 'body' ]), function (err) {
        console.log(err);
    });
    res.send("Changes saved.");
});
module.exports = router;
