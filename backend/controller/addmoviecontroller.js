    const Addmovie = require('../model/addmoviemodel');

    class Addmoviecontroller {
    async create(movieData) {
        try {
        const newMovie = await Addmovie.create({
            movie_name: movieData.movieTitle, 
            release_date: movieData.releaseDate 
        });
        return newMovie;
        } catch (error) {
        console.error('Error creating movie:', error);
        throw error;
        }
    }


    async getmovie() {
        try {
            const movies = await Addmovie.find(); 
            return movies; 
        } catch (error) {
            console.log('Error retrieving movies:', error);
            throw error; 
        }
    }

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const delitem = await Addmovie.findById(id); 
                if (!delitem) {
                    return reject({
                        msg: "Movie not found",
                        status: 0
                    });
                }
                await delitem.deleteOne();
                return resolve({
                    msg: "Movie deleted",
                    status: 1
                });
            } catch (error) {
                console.error('Error deleting movie:', error); 
                return reject({
                    msg: "Internal server error",
                    status: 0
                });
            }
        });
    }
    
    async update(id, movieData) {
        try {
            const updatedMovie = await Addmovie.findByIdAndUpdate(id, movieData, { new: true, runValidators: true });
            if (!updatedMovie) {
                throw new Error('Movie not found');
            }
            return updatedMovie;
        } catch (error) {
            console.error('Error updating movie:', error);
            throw error; 
        }
    }
    
    
    
    }

    module.exports = Addmoviecontroller;
