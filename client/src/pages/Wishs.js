import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../js/actions/wishAction";
import { addWish } from "../js/actions/wishAction";
import { getMyProducts } from "../js/actions/productAction";
import WishProduct from "../components/WishProduct";
import HeaderWish from "../components/HeaderWish";
import ModalWish from "../components/ModalWish";
import "./pages.css";
const Wishs = () => {
  //load wishList
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishList());
  }, []);
  // create first wish
  // useEffect(() => {
  //   if (!wish.wishs.length) {
  //     dispatch(addWish({ name: "First1 Wishlist" }));
  //   }
  // }, []);
  //active wishLink
  const [activ, setActiv] = useState("");
  const activIt = (id) => {
    if (id == activ) {
      return "alert-info text-primary";
    } else {
      return "";
    }
  };
  useEffect(() => {
    wishlist[0] && setActiv(wishlist[0]._id);
  }, [wishlist[0]]);
  const [myWish, setMyWish] = useState({ name: "" });
  useEffect(() => {
    setMyWish(wishlist.filter((el) => el._id == activ)[0]);
  }, [activ]);

  // load userProduct
  // load product from dtBase and store
  useEffect(() => {
    dispatch(getMyProducts());
  }, []);
  // get ProductList
  const products = useSelector((state) => state.products);
  const productList = products.Products;
  console.log("productList", productList);
  console.log("wishlist", wishlist);
  return (
    <div className="container-fluid border border-secondary ">
      <div className="row">
        <div
          className="col-2  border border-secondary  d-flex flex-column p-2 overflow-auto"
          style={{ padding: "0", height: "90vh" }}
        >
          <ModalWish />
          {wishlist.map((el) => (
            <Link
              to="#"
              className={`activLink ${activIt(el._id)}`}
              style={{ width: "100%" }}
              onClick={() => setActiv(el._id)}
            >
              {el.name}
            </Link>
          ))}
        </div>
        <div
          className="col-10  border border-secondary "
          style={{ height: "90vh" }}
        >
          <div className="d-flex align-items-center justify-content-between  p-1 m-3">
            <h4>{myWish && myWish.name}</h4>
            <div
              className="d-flex  align-items-center justify-content-around"
              style={{ width: "200px" }}
            >
              <span>
                <i className="far fa-edit"></i> Edit
              </span>
              <span className="text-danger">
                <i className="far fa-trash-alt"></i> Delete
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between border border-secondary p-3  m-3">
            <div
              className="d-flex  align-items-center justify-content-between"
              style={{ width: "150px" }}
            >
              <span>To buy</span>
              <span className="text-danger">Bought</span>
            </div>
            <div
              className="d-flex  align-items-center justify-content-around"
              style={{ width: "150px" }}
            >
              <span>
                <i className="fas fa-th-large"></i> Grid
              </span>
              <span className="text-danger">
                <i className="fas fa-bars"></i> List
              </span>
            </div>
          </div>
          <div
            className=" border border-secondary  p-3 m-3  "
            style={{ overflowY: "auto", height: "60%" }}
          >
            <HeaderWish />
            <hr />

            {productList ? (
              productList
                .filter((el) => el.assignedTo == activ)
                .map((el) => (
                  <>
                    <WishProduct el={el} /> <hr />
                  </>
                ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishs;
