const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//  Mongodb and api
app.get('/', (req, res) => {
    res.send('Server Running')
});




// Listner
app.listen(port, () => {
    console.log('Server Runnin on Port:', port);
});