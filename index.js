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
        const reviewCollection = client.db('snapWithAmit').collection('reviews');

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

        app.get('/reviews/:id', async(req, res) => {
            const id = req.params.id;
            const query = { serviceId: id };
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
        app.get('/myreview/:email', async(req, res) => {
            const email = req.params.email;
            const query = { userEmail : email};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
        app.get('/review/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const review = await reviewCollection.findOne(query);
            res.send(review);
        });




        // post method 

        app.post('/service', async(req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        });

        app.post('/review', async(req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });


        // delete method 

        app.delete('/review/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        });


        // put method

        app.put('/review/:id', async(req, res) => {
            const id = req.params.id;
            const review = req.body;
            const filter = {_id: ObjectId(id)};
            const option = {upsert: true};
            const updatedUser = {
                $set: {
                    rating: review.rating,
                    review: review.review,
                }
            };
            const result = await reviewCollection.updateOne(filter, updatedUser, option);
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