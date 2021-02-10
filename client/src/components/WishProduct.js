import React from "react";

const WishProduct = ({ el }) => {
  console.log(el);
  return (
    <div className="row " style={{ lineHeight: " 300%" }}>
      <span className="col-1 mx-3   text-center">
        <img
          src={el.image}
          alt=""
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </span>
      <span className="col-2  ">{el.name}</span>
      <span className="col overflow-auto " style={{ maxHeight: "140px" }}>
        {el.descriptions}
      </span>
      <span className="col-1 mx-3  ">{el.status}</span>
      <span className="col-1 mx-3  ">{el.price}</span>
    </div>
  );
};

export default WishProduct;
