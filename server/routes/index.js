var express = require('express');
var router = express.Router();

var fs = require('file-system');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('../../client/dist/index.html');
});

router.get('/getIconfig', function(req, res, next){

    res.contentType('application/json');

    fs.readFile('iconfig.json', (err, data)=>{

        console.log(data);

        var iconfigJson = JSON.stringify(data);

        res.send(iconfigJson);


    });




});

router.post('/sendJson', function(req, res, next){

    fs.writeFile('testconfig.json', '{"name":"Abbas B."}', function(err){
        console.log(err);
    } );

  res.send("Changes saved.");

});

module.exports = router;
