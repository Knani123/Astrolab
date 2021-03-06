import React, { useState, useEffect, useRef } from "react";
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
import WishProductGrid from "../components/WishProductGrid";
const Wishs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //load wishList
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  useEffect(() => {
    dispatch(getWishList());
  }, []);
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
  useEffect(() => {
    setProStatus(null);
  }, []);
  const borderIt = () => {
    return { outline: "5px solid yellow" };
  };
  //handle view
  const [view, setView] = useState("Grid");
  //function to get widthScreen
  const widthScreen = () => {
    let body = document.getElementsByTagName("body")[0];
    let widthBody = parseInt(
      window.getComputedStyle(body).getPropertyValue("width")
    );
    return widthBody;
  };
  //responsive btn
  const [show, setShow] = useState(true);
  const prodList = useRef();
  const handleshow = () => {
    prodList.current.style.transform = show
      ? "translateX(-100%)"
      : "translateX(0%)";
    setShow(!show);
    prodList.current.style.transition = "0.4s";
  };

  const translateAdd = () => {
    let widthBody = widthScreen();
    if (widthBody < 860) {
      prodList.current.style.transform = "translateX(-100%)";
      setShow(false);
    }
  };
  return (
    <div className="container-fluid border border-secondary overflow-hidden ">
      <div className="row ">
        <div
          ref={prodList}
          className="wish-add  col-2  border border-secondary  d-flex flex-column  "
        >
          <button
            className={`btn btn-${
              show ? "danger" : "success"
            } rounded-circle btn-show`}
            onClick={handleshow}
          >
            <i className="fas fa-arrows-alt-h"></i>
          </button>
          <ModalWish prodList={prodList} translateAdd={translateAdd} />
          {wishlist.map((el, i) => (
            <Link
              key={i}
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
          className="wish-products col-10  border border-secondary "
          onClick={translateAdd}
        >
          <div className="top-header d-flex align-items-center justify-content-between  p-1 mx-3 mt-2">
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

          <div className="header d-flex align-items-center justify-content-between border border-secondary w-100 ">
            <div className=" status-btn d-flex   ">
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
            <div className="list-grid d-flex  align-items-center justify-content-around">
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
            className={` border border-secondary ${
              view == "list"
                ? "border border-secondary  p-3 m-3"
                : "row justify-content-around"
            }`}
            style={{ overflowY: "auto", height: "75%" }}
          >
            {view == "list" && window.innerWidth > 860 && (
              <>
                {" "}
                <HeaderWish /> <hr />
              </>
            )}

            {productList &&
              productList
                .filter(
                  (el) =>
                    el.assignedTo == activ &&
                    (proStatus ? el.status == proStatus : 1)
                )
                .map((el, i) =>
                  view == "list" ? (
                    <>
                      <WishProduct el={el} key={i} /> <hr />
                    </>
                  ) : (
                    <WishProductGrid el={el} key={i} />
                  )
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishs;
