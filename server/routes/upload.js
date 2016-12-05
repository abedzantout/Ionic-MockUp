const express = require('express');
const router  = express.Router();
const multer  = require("multer");
const crypto  = require('crypto');
const path    = require('path');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        let last = null;

        var exec = require('child_process').exec;

        exec('ls',  {cwd: '../ionic-templates'} ,(err, stdout, stderr)=>{

            if(err){
                console.log(err);
                return;
            }

            let lsOut = stdout.toString();

            let a = lsOut.substring(0, lsOut.lastIndexOf("\n"));
            last = a.substring(a.lastIndexOf("\n"), a.length);

            while(last.includes("\n")){last=last.replace("\n","");}

            last = parseInt(last);
            console.log("just set last ...");

            let lastStr = (last+1).toString();

            fs.mkdir('../ionic-templates/' + lastStr, err => {
                console.log(err);
                cb(null, '../ionic-templates/' + lastStr);
            });


            exec('unzip '+file['originalname'],  {cwd: '../ionic-templates/'+lastStr}, (unziperr, unzipsrdout, unzipstderr)=>{
                console.log(unziperr);
            });


        });





    },
    filename   : (req, file, cb) => {
        cb(null, file.originalname.split('/').pop().trim());
    }
});


let upload    = multer({dest: '../ionic-templates', storage: storage});

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.post("/upload", upload.array('uploads[]', 1), function (req, res) {
    res.send(req.files);
});
module.exports = router;