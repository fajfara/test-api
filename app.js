const fs = require('fs');
const express = require('express');
const app = express();


app.get('/api/:index', (req, res) => {
    let index = req.params.index;
    

    try {
        let data = fs.readFileSync('./JSON-data/'+ index + '.json', 'utf8');
        let jsonData = JSON.parse(data);
        res.send(jsonData);
    }
    catch(err) {
        res.send("Cannot find a file with index: " + index);
    }

    
});

app.put('/api/update', (req, res) => {
    let responseJSON = JSON.parse(res.body);
    var d = new Date();
    var n = d.toISOString();
    

    res.send("Updated the log file");

})



app.listen(3333, () => console.log("Running on port 3000..."));