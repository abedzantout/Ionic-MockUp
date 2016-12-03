let express = require('express');
let router  = express.Router();
let fs      = require('fs');
router.get('/store', (req, res, next) => {
    let that  = this;
    this.data = null;
    fs.readFile('mapping.json', 'utf8', (err, data) => {
        if ( err ) throw err;
        that.data = JSON.parse(data);
        res.send(this.data);
    });
});
module.exports = router;