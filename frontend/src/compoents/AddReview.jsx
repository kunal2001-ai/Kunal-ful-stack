import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState({});
const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:5000/addmovie/getmovie')
      .then((success) => {
        console.log(success.data.data); 
        setMovies(success.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!selectedMovie) newErrors.selectedMovie = "Please select a movie";
    if (!name) newErrors.name = "Name is required";
    if (!rating) newErrors.rating = "Rating is required";
    if (!comments) newErrors.comments = "Comments are required";
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const reviewData = {
        movie_id: selectedMovie,
        name,
        rating,
        comments,
      };

      axios.post('http://localhost:5000/addreview/add_review', reviewData)
        .then((response) => {
          console.log("Review submitted successfully:", response.data);
          if(response.data.message==='Review added successfully'){
            navigate(`/review/${response.data.data.movie_id}`)
          }
          setSelectedMovie("");
          setName("");
          setRating("");
          setComments("");
        })
        .catch((error) => {
          console.log("Error submitting review:", error);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="w-[30%] mt-2 p-6 border-2 bg-white shadow-md m-auto rounded-lg">
        <h1 className="text-xl mb-4">Add New Review</h1>
        <form action="" onSubmit={submitHandler}>
          <div className="mb-4">
            <select
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <option value="">Select a movie</option>
              {movies.length > 0 ? (
                movies.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.movie_name}
                  </option>
                ))
              ) : (
                <option value="">Loading movies...</option>
              )}
            </select>
            {errors.selectedMovie && (
              <span className="text-red-500 text-sm">{errors.selectedMovie}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Rating out of 10"
              min="0"
              max="10"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {errors.rating && (
              <span className="text-red-500 text-sm">{errors.rating}</span>
            )}
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Review Comments"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
            {errors.comments && (
              <span className="text-red-500 text-sm">{errors.comments}</span>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition"
            >
              Create Review
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddReview;
