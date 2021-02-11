import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../js/actions/wishAction";
const ProductDetails = ({ product }) => {
  const { _id, name, descriptions, image, status, price } = product;
  //load wishList
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishList());
  }, []);

  return (
    <div className="mt-5  mx-3 ">
      <div className="d-flex m-2 ">
        <img
          src="https://whyfutz.com/wp-content/uploads/2020/04/product.jpg"
          alt=""
          width="50%"
          style={{ height: "200px" }}
          className=" mt-5 border"
        />
        <div
          // style={{ width: "300px" }}
          style={{ height: "220px" }}
          className="d-flex flex-column justify-content-between m-4  "
        >
          <span>
            <h3 className="my-3">{name}</h3>
            <p
              style={{ maxHeight: "150px", width: "300px" }}
              className="overflow-auto "
            >
              {descriptions}
            </p>
          </span>
          <span className="d-flex">
            Price: &nbsp; <h6>{price}</h6>
          </span>
        </div>
        <span className="d-flex flex-column my-4">
          <span>
            <i className="far fa-edit"></i> Edit
          </span>
          <span className="text-danger">
            <i className="far fa-trash-alt "></i> Delete
          </span>
        </span>
      </div>
      <p className=" m-2">
        {wishlist &&
          product &&
          wishlist.find((el) => el._id == product.assignedTo) &&
          wishlist.find((el) => el._id == product.assignedTo).name}
      </p>
      <p className=" m-2">{status}</p>
    </div>
  );
};

export default ProductDetails;
