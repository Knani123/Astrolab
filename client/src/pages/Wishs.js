import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWishList, deleteWish } from "../js/actions/wishAction";
import { addWish } from "../js/actions/wishAction";
import { getMyProducts, deleteproduct } from "../js/actions/productAction";
import WishProduct from "../components/WishProduct";
import HeaderWish from "../components/HeaderWish";
import ModalWish from "../components/ModalWish";
import "./pages.css";
import EditWish from "../components/EditWish";
const Wishs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //load wishList
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
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

  //delete wishlist and its products
  function deleteIt() {
    const confirm = window.confirm(
      `Do you really want to delete ${myWish.name} and all its products?? `
    );
    console.log("products", productList);
    if (confirm) {
      //delete its products
      productList
        .filter((el) => el.assignedTo == activ)
        .map((el) => dispatch(deleteproduct(el._id)));
      //delete wishlist
      dispatch(deleteWish(myWish._id));
      history.push("./load2");
    }
  }
  //handle statue
  const [proStatus, setProStatus] = useState(null);
  console.log(proStatus);
  useEffect(() => {
    setProStatus(null);
  }, []);
  const borderIt = () => {
    return { outline: "5px solid yellow" };
  };
  //handle view
  const [view, setView] = useState("list");
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
              <EditWish myWish={myWish && myWish} />
              <span
                className="text-danger border"
                onClick={deleteIt}
                onMouseMove={(e) => {
                  e.target.classList.remove("text-danger");
                  e.target.style.color = "red";
                }}
                onMouseOut={(e) => {
                  e.target.classList.add("text-danger");
                  e.target.style.color = "";
                }}
                style={{ cursor: "pointer" }}
              >
                <i className="far fa-trash-alt"></i> Delete
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between border border-secondary p-3  m-3">
            <div
              className="d-flex  align-items-center justify-content-between "
              style={{ width: "200px" }}
            >
              <span
                className="btn btn-outline-primary"
                onClick={() => setProStatus(null)}
                style={proStatus == null ? borderIt() : { outline: "none" }}
              >
                All
              </span>
              <span
                onClick={() => setProStatus("To buy")}
                className="btn btn-outline-success"
                style={proStatus == "To buy" ? borderIt() : { outline: "none" }}
              >
                To buy
              </span>
              <span
                className="btn btn-outline-danger"
                onClick={() => setProStatus("Bought")}
                style={proStatus == "Bought" ? borderIt() : { outline: "none" }}
              >
                Bought
              </span>
            </div>
            <div
              className="d-flex  align-items-center justify-content-around"
              style={{ width: "150px" }}
            >
              <span
                onClick={() => setView("grid")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-th-large"></i> Grid
              </span>
              <span
                onClick={() => setView("list")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-bars"></i> List
              </span>
            </div>
          </div>
          <div
            className=" border border-secondary  p-3 m-3  "
            style={{ overflowY: "auto", height: "75%" }}
          >
            {view == "list" && (
              <>
                {" "}
                <HeaderWish /> <hr />
              </>
            )}

            {productList && view == "list" ? (
              productList
                .filter(
                  (el) =>
                    el.assignedTo == activ &&
                    (proStatus ? el.status == proStatus : 1)
                )
                .map((el) => (
                  <>
                    <WishProduct el={el} /> <hr />
                  </>
                ))
            ) : (
              <h1>Loading Grid...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishs;
