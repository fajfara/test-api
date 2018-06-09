const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let dirCount = [];

app.use(bodyParser.json());


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

app.post('/api/add', (req, res) => {
    fs.readdirSync('./JSON-data/').forEach( file => {
        dirCount.push(file);
    });
    let data = fs.writeFileSync('./JSON-data/' + ( dirCount.length + 1 ) + '.json', JSON.stringify(req.body), 'utf8');
    res.send("Index filed created and stored");
});

app.put('/api/update/:index', (req, res) => {
    console.log("Inside of response function...");
    var fileIndex = req.params.index;
    var update;
    var d = new Date();
    var n = d.toISOString();
    if(req.query.name === undefined || req.query.value === undefined){
        update = "There was an error with the request, no name or value provided at: "
                 + fileIndex + " index, " + 
                 ". Error was produced at: " + n;
        fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
        res.send("Provided name and value to change!");
        return;
    }


    try {
        console.log("Inside of try...");
        let data = fs.readFileSync('./JSON-data/'+ fileIndex + '.json', 'utf8');
        console.log(data);
        let jsonData = JSON.parse(data);
        jsonData.forEach( item => {
            if(item.name == req.query.name && item.name == req.query){
                console.log("Inside of first if...");
                update = "Attemped to change the value of: " 
                         + fileIndex + " file, " + " at name: " 
                         + req.query.name + " to new value: " 
                         + req.query.value + "There was no change value already ok. "+ 
                         "Change was issued at: " 
                         + n;
                
                fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
                res.send("Updated the log file");

            } else if(item.name == req.query.name){
                console.log("Inside of second if...");
                item.name = req.query.value;
                fs.writeFileSync('./JSON-data/' + fileIndex + '.json', JSON.stringify(jsonData), 'utf8');

                update = "Changed value of: "
                         + fileIndex + "file, " 
                         + " at name:" + req.query.name
                         + " to new value: " + 
                         req.query.value + 
                         ". Change was issued at: "
                         + n;
                
                fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
                res.send("Updated the log file");
            }
        });



    } catch (error) {
        update = "There was an error with the request, missing file with "
                 + fileIndex + " index, " + 
                 ". Error was produced at: " + n;
        fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
        res.send("error file with that index not found" + error);
    }

});



app.listen(3333, () => console.log("Running on port 3333..."));