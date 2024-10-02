const express = require('express');
const Addmoviecontroller = require('../controller/addmoviecontroller');

const addmovierouter = express.Router();

addmovierouter.post('/add_movie', (req, res) => { 
  const result = new Addmoviecontroller().create(req.body);
  console.log(result)
  result
    .then((succ) => {
      res.status(200).json({ message: 'Movie added successfully', data: succ });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error adding movie', error: err });
    });
});

addmovierouter.get('/getmovie', (req, res) => {
    const result = new Addmoviecontroller().getmovie();
    result
        .then((succ) => {
            res.status(200).json({ message: 'Movies retrieved successfully', data: succ });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving movies', error: err });
        });
});

addmovierouter.delete('/deleteMovie/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const result = await new Addmoviecontroller().delete(id);
    if (result.status) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
});

addmovierouter.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const result = await new Addmoviecontroller().update(id, updatedData);
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

 
  
module.exports = addmovierouter;
