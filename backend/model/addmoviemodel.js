const mongoose = require('mongoose');

const addmovieSchema = new mongoose.Schema(
    {
        movie_name:{
            type:String,
            maxLenght: 100
        },
        release_date:{
            type:String
        }
    },
    {
        timestamps: true
    }
)

const addmovie = new mongoose.model('addmovie', addmovieSchema)

module.exports = addmovie