import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {};
    if (!movieTitle) newErrors.movieTitle = "Movie title is required.";
    if (!releaseDate) newErrors.releaseDate = "Release date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/addmovie/add_movie", {
            movieTitle,
            releaseDate,
        });
        console.log("Movie created successfully:", response.data);

        if (response.data.message === "Movie added successfully") { 
            navigate("/")
        } 

    } catch (error) {
        console.error("Error creating movie:", error);
    }

    setMovieTitle("");
    setReleaseDate("");
    setErrors({});
};

  return (
    <div className="w-[30%] mt-2 p-6 border-2 bg-white shadow-md rounded-lg mx-auto">
      <h1 className="text-xl mb-4">Add New Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="movieTitle"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Movie Title"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          {errors.movieTitle && (
            <p className="text-red-500 text-sm">{errors.movieTitle}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="date"
            name="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            placeholder="Release Date"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          {errors.releaseDate && (
            <p className="text-red-500 text-sm">{errors.releaseDate}</p>
          )}
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition"
          >
            Create Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
