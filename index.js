const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

//  Mongodb and api

const uri = "mongodb+srv://snap-with-amit-user:YUp1twTmMMps1o1U@cluster0.mqmhnff.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Welcome to Node mongo crud server.');
});

const run = async() => {
    try{
        const serviceCollection = client.db('snapWithAmit').collection('services');

        // get method 

        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services/:limit', async(req, res) => {
            const limit = parseInt(req.params.limit);
            const query = {};
            const cursor = serviceCollection.find(query).limit(limit);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/service/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });



        // post method 

        app.post('/service', async(req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        });












    }
    finally{

    }
};

run().catch(err => console.log(err));





// Listner
app.listen(port, () => {
    console.log('Server Runnin on Port:', port);
});