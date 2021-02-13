import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../js/actions/wishAction";
import { addProduct, clearErrProd } from "../js/actions/productAction";
import Product from "../gallery/Product.png";
import Alert from "./Alert";
import "./cmp.css";
import axios from "axios";
const AddProduct = () => {
  const dispatch = useDispatch();
  //get errors
  const [ops, setOps] = useState([{ msg: "" }]);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    setOps(products.errors);
    setTimeout(() => {
      dispatch(clearErrProd());
      setOps([]);
    }, 3000);
  }, [products.errors]);
  //load wishList to map them in whislist select
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  useEffect(() => {
    dispatch(getWishList());
  }, []);
  //change info to add product
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    descriptions: "",
    image:
      "https://img-0.journaldunet.com/pb5J23IF99HMY_P9HtO64G38epM=/1240x/smart/32d90de13a5f411c86709152f70fc67c/ccmcms-jdn/10861192.jpg",
    status: "",
    price: "",
    currency: "",
    assignedTo: "",
  });
  const clearInfo = () => {
    setInfo({
      name: "",
      descriptions: "",
      image: "",
      status: "",
      price: "",
      currency: "",
      assignedTo: "",
    });
  };
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  //select Image
  const selectImage = (e) => {
    setFile(e.target.files[0]);
  };
  //submit Product info
  const handleSubmit = (e) => {
    e.preventDefault();
    //add image
    let formData = new FormData();
    formData.append("avatar", file);
    axios
      .post("/img", formData)
      .then((res) =>
        dispatch(addProduct({ ...info, image: res.data.imageName }))
      );
  };

  return (
    <div className="  w-50 m-auto d-flex flex-column align-itmes-center">
      <h3 className="text-center m-4">Add Product</h3>
      <h3 className="position-relative text-danger">
        {ops && ops[0] && ops[0].msg}
      </h3>
      <form
        className="border border-dark d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto my-2">
          <img src={Product} alt="add Logo" width="150px" />
          <input type="file" name="avatar" onChange={selectImage} required />
        </div>
        <div className="d-flex justify-content-evenly my-2">
          <span className="d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input
              value={info.name}
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
              value={info.price}
              type="number"
              id="price"
              className="form-control"
              required
              onChange={handleChange}
            />
          </span>
          <span className="d-flex flex-column">
            <label htmlFor="">Currency</label>
            <select
              id="currency"
              className="select1"
              required
              value={info.currency}
              onChange={handleChange}
            >
              <option value="">-- Currency --</option>
              <option value="USD">Dollar</option>
              <option value="EUR">Euro</option>
              <option value="TND">Dinar</option>
            </select>
          </span>
        </div>
        <span className="d-flex flex-column px-4 pb-2">
          <label htmlFor="descriptions">Description</label>
          <textarea
            value={info.descriptions}
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
              value={info.assignedTo}
              className="select"
              required
              onChange={handleChange}
              id="assignedTo"
            >
              <option value="">-- Choise WishList --</option>
              {wishlist &&
                wishlist.map((el) => <option value={el._id}>{el.name}</option>)}
            </select>
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="status">Status</label>
            <select
              value={info.status}
              className="select"
              id="status"
              required
              onChange={handleChange}
            >
              <option value="">-- Choise Status --</option>
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
