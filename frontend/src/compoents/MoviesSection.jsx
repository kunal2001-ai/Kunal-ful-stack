import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import MoviesSectionCard from "./MoviesSectionCard";
import axios from "axios";

const MoviesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]); 
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    rating: "",
  });

  useEffect(() => {
    axios.get('http://localhost:5000/addreview/getreview')
      .then((success) => {
        console.log(success.data.data);
        setReviews(success.data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/addmovie/getmovie')
      .then((success) => {
        setMovies(success.data.data);
        console.log(success.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.movie_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (movieId) => {
    axios.delete(`http://localhost:5000/addmovie/deleteMovie/${movieId}`)
      .then((success) => {
        console.log('success', success);
        if (success.data.msg === 'Movie deleted') {
          setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== movieId));
        }
      })
      .catch((error) => {
        console.log('Error deleting movie:', error);
      });
  };

  return (
    <div className="sm:px-20 px-4 flex flex-col sm:items-start items-center">
      <div className="py-5 text-3xl">The best movie reviews site!</div>
      <div className="flex items-center gap-1 border-[#6558f5] px-2 py-1 rounded-md border-[1.5px] sm:w-[35%] w-[80%] pl-2">
        <CiSearch className="text-lg mt-1" />
        <input
          type="text"
          placeholder="Search for your favourite movie"
          className="border-none outline-none text-sm placeholder:text-sm placeholder:font-[600] w-[100%]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {editingMovie ? (
        <div className="py-5 flex flex-col items-center">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Release Date"
            value={formData.releaseDate}
            onChange={(e) =>
              setFormData({ ...formData, releaseDate: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Update Movie
          </button>
        </div>
      ) : (
        <div className="py-5 flex sm:flex-row sm:flex-wrap flex-col items-center sm:gap-5 gap-2 w-[1100px]">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => {
              // Calculate the average rating for each movie
              const movieReviews = reviews.filter(review => review.movie_id === movie._id);
              const averageRating = movieReviews.length > 0
                ? movieReviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / movieReviews.length
                : 0; // Default to 0 if no reviews

              return (
                <MoviesSectionCard
                  key={movie._id}
                  item={movie}
                  onDelete={handleDelete}
                  rating={averageRating.toFixed(1)} // Pass the average rating
                />
              );
            })
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesSection;
