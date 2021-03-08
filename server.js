const express = require('express');//import express
const app = express();
const port = 3000;

app.post('/create',(req,res) => {
    console.log('create');
});

app.get('/read',(req,res) => {
    console.log('read');
});

app.put('/update', (req, res) => {
    console.log('update');
});

app.delete('/delete', (req, res) => {
    console.log('delete');
});

app.listen(port, () => {
    console.log('App listening on port 3000!');
});