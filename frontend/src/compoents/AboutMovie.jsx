import React, { useEffect, useState } from "react";
import AboutMovieCard from "./AboutMovieCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const AboutMovie = () => {
  const [movies, setMovies] = useState([]);
  const [moviename, setMovieName] = useState(); 
  const { id } = useParams(); 

  useEffect(() => {
    axios.get('http://localhost:5000/addmovie/getmovie')
      .then((success) => {
        const movieData = success.data.data.filter(item => item._id === id);
        if (movieData.length > 0) {
          setMovieName(movieData[0].movie_name); 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); 

  useEffect(() => {
    axios.get('http://localhost:5000/addreview/getreview')
      .then((success) => {
        const filteredMovies = success.data.data.filter(item => item.movie_id === id); 
        setMovies(filteredMovies); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); 

  const totalRating = movies.reduce((sum, movie) => {
    const rating = Number(movie.rating);
    return isNaN(rating) ? sum : sum + rating; // Add only valid ratings
  }, 0);

  const averageRating = movies.length > 0 ? totalRating / movies.length : 0; // Set to 0 if no movies

  const handleDelete = (movieId) => {
    axios.delete(`http://localhost:5000/addreview/deleteReview/${movieId}`)
      .then((success) => {
        if (success.data.msg === 'Movie deleted') {
          setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== movieId));
        }
      })
      .catch((error) => {
        console.log('Error deleting movie:', error);
      });
  };

  return (
    <>
      <div className="w-[95%] sm:px-20 px-4">
        <div className="flex justify-between sm:text-3xl text-2xl py-5">
          <div className="">{moviename || "Loading..."}</div> 
          <div className="text-[#6558f5]">{averageRating.toFixed(1)}/10</div> {/* No need for optional chaining */}
        </div>

        <div className="flex flex-col gap-5">
          {movies.map((item) => (
            <AboutMovieCard key={item._id} item={item} onDelete={handleDelete} /> 
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutMovie;
