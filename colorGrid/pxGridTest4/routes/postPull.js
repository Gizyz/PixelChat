let express = require('express');
let router = express.Router();
let fs = require('fs')




router.get("/", (req, res) => {
    fs.readFile('./public/images/data.json', (err, data) => {
        if (err) throw err; 
        else res.send(data);
        
    });
})

router.post("/", async (req, res) => {
    fs.writeFile('./public/images/data.json', JSON.stringify(req.body), (err) => err && console.error(err));
})
module.exports = router;
