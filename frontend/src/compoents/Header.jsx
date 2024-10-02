import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  let navBtn = "border-[1px] rounded-md py-1 sm:px-3 px-2 sm:text-lg text-sm";
  return (
    <>
      <div className="flex justify-between sm:px-20 px-4 bg-[#E3E8ED] items-center sm:py-4 py-4">
      <Link to={'/'}>  <div className="sm:text-xl text-lg">MOVIECRITIC</div> </Link>
        <div className="flex sm:flex-row flex-col justify-between items-start sm:gap-3 gap-2">
       <Link to={"/addmovie"}>   <div
            className={`${navBtn} border-[#6558f5] text-[#6558f5] bg-white hover:cursor-pointer`}
          >
            Add new movie
          </div>
          </Link>
          <Link to={"/addmoviereview"}>
          <div
            className={`${navBtn} border-[#6558f5] bg-[#6558f5] text-white hover:cursor-pointer`}
          >
            Add new review
          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
