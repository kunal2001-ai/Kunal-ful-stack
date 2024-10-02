import React from "react";
import {BiEdit} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import { Link } from "react-router-dom";

const AboutMovieCard = ({item, onDelete}) => {
  return (
    <>
      <div className="border-[2px] px-5 py-2 flex flex-col gap-5 justify-between">
        <div className="flex justify-between">
          <div>{item.comment}</div>
          <div className="text-[#6558f5]">{item.rating}</div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <i>{item.name}</i>
          </div>
          <div
            className="flex gap-2 justify-end text-[#788896] text-xl
              "
          >
         <Link to={`/editreview/${item._id}`}>   <div className="hover:cursor-pointer">
              <BiEdit />
            </div>
            </Link>
            <div className="hover:cursor-pointer"
            onClick={() => onDelete(item._id)}>
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMovieCard;
