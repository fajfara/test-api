// Importanje vse knjižnic
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// variabile
let dirCount = [];
let update;

// uporaba bodyparserja za JSON
app.use(bodyParser.json());

// Dodajanje headerja na server
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// GET route, mora biti podan index drugače je vrne error
app.get('/api/:index', (req, res) => {
    // Variabile
    let index = req.params.index;
    let d = new Date();
    let n = d.toISOString();
    // Try block za testiranje ali file s tem indexom obstaja
    try {
        let data = fs.readFileSync('./JSON-data/'+ index + '.json', 'utf8');
        let jsonData = JSON.parse(data);
        // Zapis za log dodan
        update  =    "File retrieved with an index of: "
                    + index + " , " + 
                    ". Date: " + n;
        fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
        res.send(jsonData);
    }
    catch(err) {
        update  =   "Tried to retrieve a file with an index of: "
                + index + ". File not found." + 
                " Date: " + n;
        fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
        res.send(err);
    }

    
});

// POST route
app.post('/api/add', (req, res) => {
    // forEach loop za število vseh datotek v mapi
    fs.readdirSync('./JSON-data/').forEach( file => {
        dirCount.push(file);
    });
    // Variabile
    let d = new Date();
    let n = d.toISOString();
    let respond;
    // Index oz. ime datoteke
    let saveIndex = dirCount.length + 1;

    // Zapis file v mapo JSON-data
    let data = fs.writeFileSync('./JSON-data/' + saveIndex + '.json', JSON.stringify(req.body), 'utf8');
    update  =   "New index file was added. The index of the new file: "
                + saveIndex + " , " + 
                ". Date: " + n;
    fs.appendFileSync('./log/input.log', update + "\n", 'utf8');
    // Še pošiljanje imena oz. indexa datoteke nazaj 
    res.send(
        respond = {
            number: saveIndex
        }
    );
});



app.listen(3333, () => console.log("Running on port 3333..."));