let express = require('express');
let router = express.Router();
let fs = require('fs')




router.get("/", (req, res) => {
    res.send(`postin`);
    fs.readFile('./public/images/canvas.txt', (err, data) => {
        if (err) throw err; 
        else console.log(data)
        res.send(`postin ${data}`);
    });
})

router.post("/", async (req, res) => {
    fs.writeFile('./public/images/canvas.txt', req);
})
module.exports = router;
