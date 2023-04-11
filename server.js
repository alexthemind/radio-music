const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname,'build')));

app.get('/get-audio', (req,res) => {

    let url = path.join(__dirname,'public','audio');

    fs.readdir(url,(err,data) => {
        if(err) throw err;

        res.send(JSON.stringify(data));
    });
});

app.get('/',(req,res) => {
    res.sendFile('index.html',{
        root: path.join(__dirname,'build')
    })
})


app.listen(PORT,() => console.log('Server listen in port:',PORT));