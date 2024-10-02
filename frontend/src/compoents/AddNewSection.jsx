import React from "react";
import {TbCircleLetterPFilled} from "react-icons/tb";

const AddNewSection = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex sm:flex-row flex-col gap-5 justify-between mt-5">
        {/* Add New Movie Section */}
        <div className="max-w-md mx-auto p-6 border-2 bg-white shadow-md ml-5 rounded-lg">
          <h1 className="text-xl mb-4">Add New Movie</h1>

          <div className="mb-4">
            <input
              type="text"
              name="movieTitle"
              placeholder="Movie Title"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="releaseData"
              placeholder="Release Date"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          <div className="text-right">
            <button className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition">
              Create Movie
            </button>
          </div>
        </div>

        {/* Add New Review Section */}
        <div className="max-w-md mx-auto p-6 border-2 bg-white shadow-md ml-5 rounded-lg">
          <h1 className="text-xl mb-4">Add New Review</h1>
          <div className="mb-4">
            <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2">
              <option value="">Select a movie</option>
              <option value="new_hope">Star Wars: A New Hope</option>
              <option value="empire">Star Wars: The Empire Strikes Back</option>
              <option value="jedi">Star Wars: Return of the Jedi</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Rating out of 10"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Review Comments"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            ></textarea>
          </div>

          <div className="text-right">
            <button className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition">
              Create Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSection;
