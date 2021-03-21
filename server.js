const express = require('express');//import express
const mongodb = require('mongodb');
const app = express();
var cors = require('cors');//import cors

app.use(express.json());
app.use(cors());//enable all cors

const MongoClient = mongodb.MongoClient;//initialize the connection

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Articles';

app.post('/create',(req,res) => {
    
    MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(error,client) =>{
        if(error){
            res.status(500).send({
                message : "Database Error"
            });
        }
        const db = client.db(databaseName);//connect to specific database

        db.collection('Article').insertOne({
            article_heading : req.body.heading,//add data
            article_body : req.body.body
        }, (error,result) => {
            if(error) {
                res.status(500).send({
                    message : "unable to create"
                });
            } if(result){
                res.status(201).send({
                    message : "created"
                });
            }
        })
    })
});

app.get('/read',(req,res) => {
    MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(error,client) =>{
        if(error){
            res.status(500).send('database error');
        }
        const db = client.db(databaseName);//connect to specific database

        db.collection('Article').find({}).toArray(function(err,result) {
            if(err) throw err;
            res.send(result);
        })
    })
});

app.put('/update', (req, res) => {
    MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(error,client) =>{
        if(error){
            res.status(500).send('database error');
        }
        const db = client.db(databaseName);//connect to specific database

        db.collection('Article').findOneAndUpdate({}, (error,result) => {
            if(error) {
                res.status(500).send('error');
            } if(result){
                console.log(result);
            }
        })
    })
});

app.delete('/delete', (req, res) => {
    MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(error,client) =>{
        if(error){
            res.status(500).send('database error');
        }
        const db = client.db(databaseName);//connect to specific database

        db.collection('Article').findOneAndDelete({}, (error,result) => {
            if(error) {
                res.status(500).send('error');
            } if(result){
                console.log(result);
            }
        })
    })
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});