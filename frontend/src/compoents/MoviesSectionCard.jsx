import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const MoviesSectionCard = ({ item, onDelete, rating }) => {
  return (
    <div className="bg-[#E0DEFD] sm:w-80 px-5 py-5 flex flex-col gap-2">
      <div className="text-xl font-semibold">
        <Link to={`/review/${item._id}`}>{item.movie_name}</Link>
      </div>
      <div>Released: {item.release_date}</div>
      <div className="font-[500]">Rating: {rating}/10</div> {/* Show rating here */}
      <div className="flex gap-1 justify-end text-[#788896] text-xl">
        <Link to={`/edit/${item._id}`} className="hover:cursor-pointer">  
          <div>
            <BiEdit />
          </div>
        </Link>
        <div
          className="hover:cursor-pointer"
          onClick={() => onDelete(item._id)}
        >
          <MdDelete />
        </div>
      </div>
    </div>
  );
};

export default MoviesSectionCard;
