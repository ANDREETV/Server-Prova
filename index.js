const express = require('express')
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000



// Middleware
app.use(cors());
app.use(express.json());

// Endpoints
const AuthEndpoint = require('./endpoints/Auth');
app.use(AuthEndpoint);
// Middleware end

mongoose.connect(process.env.MONGODB_CONNECT).then(response => {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
        console.log(`Server aperto alla porta` + process.env.PORT)
    })
}).catch((err) => {
    console.log(err);
})

