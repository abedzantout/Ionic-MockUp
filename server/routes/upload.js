const express = require('express');
const router  = express.Router();
const multer  = require("multer");
const crypto  = require('crypto');
const path    = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        now = Date.now().toString();
        require('fs').mkdir('../ionic-templates/' + now, err => {
            cb(null, '../ionic-templates/' + now);
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
router.post("/upload", upload.array('uploads[]', 12), function (req, res) {
    res.send(req.files);
});
module.exports = router;