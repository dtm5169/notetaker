const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join('Develop/public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});


app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'uft8', (error, data) => {
        if (error) {
            throw error;
        }
        let parseData = JSON.parse(data);
        console.log(data)
        return res.json(parseData);
    })
});
 
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join (__dirname, 'db/db.json'), 'utf8', (error, data) => {
        if(error) {
            throw error;
        }
        let parseData = JSON.parse(data);
        console.log(req.body);

        req.body.id = Data.now();

        parseData.push(req.body);

        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(parseData), (error) => {
            if (error) {
                throw error;
            }
            return res.json(parseData);
        })
    });
});


app.listen(PORT, () => console.log(`listen on port ${ PORT }`));


