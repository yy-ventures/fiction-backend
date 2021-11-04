const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require('base-64');
const fileUpload = require('express-fileupload');
const fs = require("fs-extra");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const uri = "mongodb+srv://vaccine:vaccine123@cluster0.7e7ad.mongodb.net/vaccine?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("vaccine").collection("vaccine");
    app.post("/submit-pledge-data", (req, res) => {
        const submitData = req.body;
        collection.insertOne(submitData)
            .then(result => {
                res.send(result);
            })
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})