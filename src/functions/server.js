const express = require 'express';
const bodyParser = require 'body-parser';
const massive = require 'massive';

const app = express()
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
    .then( database => {
        app.set("db", database);
    })
    .catch( error => {
        console.log('massive error:', error)
    })


app.get("/api/v1/scores", (req, res) => {

})

app.post("/api/v1/scores",(req, res) => {
    
})