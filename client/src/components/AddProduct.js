import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../js/actions/wishAction";
import Product from "../gallery/Product.png";
import "./cmp.css";
const AddProduct = (props) => {
  //load wishList to map them in whislist select
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishList());
  }, []);
  console.log(wishlist);
  //change info to add product
  const [info, setInfo] = useState({
    name: "",
    descriptions: "",
    image: "",
    status: "",
    price: "",
    wish: "",
  });
  const clearInfo = () => {
    setInfo({
      name: "",
      descriptions: "",
      image: "",
      status: "",
      price: "",
      wish: "",
    });
  };
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  //submit Product info
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);
  };
  return (
    <div className="  w-50 m-auto d-flex flex-column align-itmes-center">
      <h3 className="text-center m-4">Add Product</h3>
      <form
        className="border border-dark d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto my-2">
          <img src={Product} alt="add Logo" width="150px" />
        </div>
        <div className="d-flex justify-content-evenly my-2">
          <span className="d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              required
              onChange={handleChange}
            />
          </span>
          <span className="d-flex flex-column">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              className="form-control"
              required
              onChange={handleChange}
            />
          </span>
          <span className="d-flex flex-column">
            <label htmlFor="">Currency</label>
            <select name="" id="" className="select1" required>
              <option value="Dinar">Dinar</option>
              <option value="Dollar">Dollar</option>
            </select>
          </span>
        </div>
        <span className="d-flex flex-column px-4 pb-2">
          <label htmlFor="descriptions">Description</label>
          <textarea
            required
            onChange={handleChange}
            name=""
            id="descriptions"
            cols="30"
            rows="3"
            className="from-control"
          ></textarea>
        </span>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex flex-column">
            <label htmlFor="">Wishlist</label>
            <select
              className="select"
              required
              onChange={handleChange}
              id="wish"
            >
              <option>--Choise WishList--</option>
              {wishlist &&
                wishlist.map((el) => <option value={el._id}>{el.name}</option>)}
              {/* <option value="">option 1</option>
              <option value="">option 2</option> */}
            </select>
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="status">Status</label>
            <select
              className="select"
              id="status"
              required
              onChange={handleChange}
            >
              <option value="To buy">To buy</option>
              <option value="Bought">Bought</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4 m-1">
          <button
            className="m-1 btn btn-outline-primary"
            type="reset"
            onClick={clearInfo}
          >
            Cancel
          </button>
          <button className="m-1 btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
