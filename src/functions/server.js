const express = require ('express');
const bodyParser = require ('body-parser');
const massive = require ('massive');

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
    const dbInstance = req.app.get('db');
    dbInstance.scores.find()
    .then(response => {
        res.json(response);
        console.log('Scores are ', response)
      })
      .catch(error => {
        console.log('error in get scores', error);
        res.status(500).json({ message: 'get scores error' })
      })
})

app.post("/api/v1/scores",(req, res) => {
    const dbInstance = req.app.get('db');
    const { name, score } = req.body;
    dbInstance.scores.save({
        user_name: name,
        user_score: score
    })
    .then(response => {
        res.json(response);
        console.log('The submitted score is ', response)
      })
      .catch(error => {
        console.log('error in submit score', error);
        res.status(500).json({ message: 'submit scores error' })
      })
})