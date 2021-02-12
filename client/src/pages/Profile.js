import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser } from "../js/actions/authAction";
import { getMyProducts } from "../js/actions/productAction";
import { getWishList } from "../js/actions/wishAction";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //load user and local it
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    setUser({ ...user, ...auth.user });
  }, [auth]);

  // load product from dtBase and store
  useEffect(() => {
    dispatch(getMyProducts());
  }, []);
  //get ProductList
  const products = useSelector((state) => state.products);
  const productList = products.Products;
  //load wishList
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  useEffect(() => {
    dispatch(getWishList());
  }, []);

  return (
    <div
      className="d-flex flex-column  align-items-center  vh-100  "
      style={{ backgroundColor: "#c0c2c5" }}
    >
      <h3 className="alert alert-success mt-3 text-capitalize text-canter border border-dark shadow-lg">
        Welcome {user.fname} {user.lname}
      </h3>
      <div
        className="d-flex flex-column shadow form-group py-3 px-5 mx-3 border border-success alert-light rounded "
        style={{ width: "400px" }}
      >
        <h5 className="text-dark">About</h5>
        <table className="table ">
          <tr>
            <td>
              <i className="fas fa-signature"></i> Name
            </td>
            <td className="text-capitalize">
              {user.fname} {user.lname}
            </td>
          </tr>
          <tr>
            <td>
              <i className="fas fa-envelope"></i> Email
            </td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>
              <i className="fas fa-phone-alt"></i> Phone
            </td>
            <td>{user.phone}</td>
          </tr>
        </table>
        <hr />
        <p className="alert alert-warning text-center">
          You have{" "}
          {wishlist && (
            <span style={{ fontWeight: "bold" }} className="text-dark">
              {wishlist.length}
            </span>
          )}{" "}
          Wishlists and{" "}
          {productList && (
            <span style={{ fontWeight: "bold" }} className="text-dark">
              {productList.length}
            </span>
          )}{" "}
          Products
        </p>
      </div>
    </div>
  );
};

export default Profile;
