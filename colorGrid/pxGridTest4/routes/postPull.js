const express = require('express');
const router = express.Router();
const fs = require('fs');
let storeData = {"pixels": []};
let readData;
fs.readFile('./public/images/data.json', (err, data) => {if (err) throw err; else {readData = data}}); 


router.get("/", (req, res) => {
    fs.readFile('./public/images/data.json', (err, data) => {
        if (err) throw err; 
        else res.send(JSON.parse(data));
    }); 
})

router.post("/", async (req, res) => {
    if (req.body) {

    fs.readFile('./public/images/data.json', (err, data) => {if (err) throw err; else {readData = data}}); 
    storeData.pixels.push(req.body)

    console.log(storeData)

    fs.writeFile('./public/images/data.json', JSON.stringify(storeData, null,'\t'), (err) => {res.status(200, err)});
    res.send({response: 'stored on server'})
    } else {res.send({response: 'no data posted'})}

})

function storeAsImage() {
    
}

module.exports = router;
