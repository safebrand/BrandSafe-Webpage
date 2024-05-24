import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="container items-center">
        <div></div>
        <div>
          <h2 className="text-sky-500 text-[68px] font-bold">404</h2>
          <p className="text-2xl font-[300]">OOPS! PAGE NOT BE FOUND</p>
          <p className="text-gray-400">
            Sorry but the page you are looking for does not exits,
            <br />
            have been removed,name changed or temporarily unavailable.
          </p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
