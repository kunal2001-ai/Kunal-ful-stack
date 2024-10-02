const express = require('express');
const ReviewController = require('../controller/reviewcontroller')

const reviewRouter = express.Router()

reviewRouter.post('/add_review', async (req, res) => {
    try {
        const reviewController = new ReviewController(); 
        const result = await reviewController.create(req.body); 
        console.log(result);
        res.status(200).json({ message: 'Review added successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding review', error: err });
    }
});

reviewRouter.get('/getreview', (req, res) => {
    const result = new ReviewController().getrating();
    result
        .then((succ) => {
            res.status(200).json({ message: 'Movies retrieved successfully', data: succ });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving movies', error: err });
        });
});

reviewRouter.delete('/deleteReview/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const result = await new ReviewController().delete(id);
    if (result.status) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
});

reviewRouter.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const result = await new ReviewController().update(id, updatedData);
        if (result) {
            res.status(200).json({ message: 'Movie updated successfully', data: result });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating movie', error });
    }
});

module.exports = reviewRouter