import React from "react";
import Product from "../gallery/Product.png";
import "./cmp.css";
const AddProduct = () => {
  return (
    <div className="  w-50 m-auto d-flex flex-column align-itmes-center">
      <h3 className="text-center m-4">Add Product</h3>
      <form className="border border-dark d-flex flex-column">
        <div className="mx-auto my-2">
          <img src={Product} alt="add Logo" width="150px" />
        </div>
        <div className="d-flex justify-content-evenly my-2">
          <span className="d-flex flex-column">
            <label htmlFor="">Name</label>
            <input type="text" className="form-control" />
          </span>
          <span className="d-flex flex-column">
            <label htmlFor="">Price</label>
            <input type="text" className="form-control" />
          </span>
          <span className="d-flex flex-column">
            <label htmlFor="">Currency</label>
            <select name="" id="" className="select1">
              <option value="">option 1</option>
              <option value="">option 2</option>
            </select>
          </span>
        </div>
        <span className="d-flex flex-column px-4 pb-2">
          <label htmlFor="">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            className="from-control"
          ></textarea>
        </span>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex flex-column">
            <label htmlFor="">Wishlist</label>
            <select className="select">
              <option value="">option 1</option>
              <option value="">option 2</option>
            </select>
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="">Status</label>
            <select className="select">
              <option value="">option 1</option>
              <option value="">option 2</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4 m-1">
          <button className="m-1 btn btn-outline-primary">Cancel</button>
          <button className="m-1 btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
