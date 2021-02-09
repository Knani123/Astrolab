import React from "react";

const WishProduct = ({ el }) => {
  return (
    <div className="row ">
      <span className="col-1 mx-3 border text-center">
        <img
          src={el.image}
          alt=""
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </span>
      <span className="col-2 border">{el.title}</span>
      <span className="col border">{el.Description}</span>
      <span className="col-1 mx-3 border">{el.Status}</span>
      <span className="col-1 mx-3 border">{el.Price}</span>
    </div>
  );
};

export default WishProduct;
