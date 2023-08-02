const express = require('express');
const router = express.Router();
const fs = require('fs');







router.get("/", (req, res) => {
    fs.readFile('./public/images/data.json', (err, data) => {
        if (err) throw err; 
        else res.send(JSON.parse(data));       
    }); 
})

router.post("/", async (req, res) => {
    if (req.body) {
    fs.writeFile('./public/images/data.json', JSON.stringify(req.body), (err) => {res.status(200, err)});
    res.send('stored on server')
    } else {res.send('no data posted')}

})
module.exports = router;
