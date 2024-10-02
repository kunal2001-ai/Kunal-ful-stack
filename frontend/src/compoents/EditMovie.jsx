import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditMovie() {
    const [selectedMovie, setSelectedMovie] = useState({ movie_name: '', release_date: '' });
    const { id } = useParams();

const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/addmovie/getmovie')
            .then((success) => {
                const movie = success.data.data.find(movie => movie._id === id); 
                if (movie) {
                    setSelectedMovie({
                        movie_name: movie.movie_name,
                        release_date: movie.release_date 
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedMovie(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:5000/addmovie/update/${id}`, selectedMovie)
            .then((response) => {
                console.log('Movie updated successfully:', response.data);
                if(response.data.message==='Movie updated successfully'){
                    navigate('/')
                }
            })
            .catch((error) => {
                console.error('Error updating movie:', error);
            });
    };

    return (
        <div className="w-[30%] mt-2 p-6 border-2 bg-white shadow-md rounded-lg mx-auto">
            <h1 className="text-xl mb-4">Edit Movie</h1>
            <form onSubmit={handleSubmit}> 
                <div className="mb-4">
                    <input
                        type="text"
                        name="movie_name"
                        placeholder="Movie Title"
                        value={selectedMovie.movie_name}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="release_date" 
                        placeholder="Release Date"
                        value={selectedMovie.release_date}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition"
                    >
                        Update Movie
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditMovie;
