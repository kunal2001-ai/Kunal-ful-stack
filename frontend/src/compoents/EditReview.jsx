import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditReview() {
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/addreview/getreview')
          .then((success) => {
            const filteredMovies = success.data.data.filter(item => item._id === id);
            if (filteredMovies.length > 0) {
              const movie = filteredMovies[0];
              setName(movie.name);
              setRating(movie.rating); 
              setComment(movie.comment); 
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }, [id]);


    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!rating) newErrors.rating = "Rating is required";
        if (!comment) newErrors.comment = "Comment is required";
        return newErrors;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }

        setErrors({});
        const reviewData = {
          name,
          rating,
          comment,
        };

        axios.put(`http://localhost:5000/addreview/update/${id}`, reviewData)
        .then((response) => {
            if(response.data.message==='Movie updated successfully'){
                navigate('/')
            }
            console.log(response.data.message)
        })
        .catch((error) => {
            console.error('Error updating movie:', error);
        });
    };

    return (
        <div className="w-[30%] mt-2 p-6 border-2 bg-white shadow-md m-auto rounded-lg">
            <h1 className="text-xl mb-4">Edit Review</h1>
            <form action="" onSubmit={submitHandler}>
               
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
                        type="text"
                        placeholder="Rating out of 10"
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    {errors.comment && (
                        <span className="text-red-500 text-sm">{errors.comment}</span>
                    )}
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition"
                    >
                        Update Review
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditReview;
