import React from "react";
import "./cmp.css";
const HeaderWish = () => {
  return (
    <div className="row hed ">
      <span className="col-1 mx-3 text-center ">img</span>
      <span className="col-2 ">Title</span>
      <span className="col ">Description</span>
      <span className="col-1 mx-3 ">Status</span>
      <span className="col-1 mx-3 ">Price</span>
    </div>
  );
};

export default HeaderWish;
