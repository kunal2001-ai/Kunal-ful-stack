const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const addmovie = require('./router/addmovierouter')
const addreview = require('./router/addreview')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/addmovie', addmovie);
app.use('/addreview', addreview)

mongoose.connect(
    process.env.MONGODB_URL,
    {
        dbName: process.env.DB_NAME 
    }
).then(() => {
    console.log("DB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("DB connection error: ", err);
});

