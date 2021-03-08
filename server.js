const express = require('express');//import express
const mongodb = require('mongodb');
const app = express();
app.use(express.json());

const MongoClient = mongodb.MongoClient;//initialize the connection

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Articles';

app.post('/create',(req,res) => {
    MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(error,client) =>{
        if(error){
            res.status(500).send('database error');
        }
        const db = client.db(databaseName);//connect to specific database

        db.collection('Article').insertOne({
            article_heading : req.body.heading,//add data
            article_body : req.body.body
        }, (error,result) => {
            if(error) {
                res.status(500).send('error');
            } if(result){
                res.status(201).send('created');
            }
        })
    })
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

app.listen(4000, () => {
    console.log('App listening on port 3000!');
});