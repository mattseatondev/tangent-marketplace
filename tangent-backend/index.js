const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const { User } = require('./schema');

const app = express();
app.use(cors(), bodyParser.json());
const port = 4269;

const uri = 'mongodb://localhost:27019/tangent-dev';

MongoClient.connect(uri, (connectionErr, client) => {
    if (connectionErr) {
        console.log({ connectionErr });
        return;
    }
    const db = client.db();
    const collection = db.collection('tangent-dev');

    app.get('/', (req, res) => {
        collection.find({}).toArray((getAllErr, docs) => {
            if (getAllErr) {
                console.error('Failed to retrieve documents: ', { getAllErr });
                return;
            }
            res.json(docs);
        });
    });

    // app.get('/', async (req, res) => {
        
    // })

    app.post('/', async (req, res) => {
        try {
            const { email, firstName, lastName } = req.body;
            const user = new User({ email, firstName, lastName });
            await user.save();
            res.status(200).send(JSON.stringify(user));
        } catch(postUserErr) {
            console.log({ postUserErr });
            res.status(500).send(JSON.stringify(postUserErr));
        }
    })

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})