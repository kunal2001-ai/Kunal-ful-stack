const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        movie_id:{
            type:String,
            maxLenght: 100
        },
		name:{
            type:String,
			maxLenght: 100
     
        },
        rating:{
            type:String,
			maxLenght: 10
        },
		comment:{
            type:String
        }
    },
    {
        timestamps: true
    }
)

const reviews = new mongoose.model('reviews', ReviewSchema)

module.exports = reviews