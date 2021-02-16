import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMyProducts, clearErrProd } from "../js/actions/productAction";
import AddProduct from "../components/AddProduct";
import ProductDetails from "../components/ProductDetails";
import ProdCardRes from "../components/ProdCardRes";
import defaultImage from "../gallery/defaultImage.jpg";
const Products = () => {
  const dispatch = useDispatch();
  // load product from dtBase and store
  useEffect(() => {
    dispatch(getMyProducts());
  }, []);

  //get ProductList
  const products = useSelector((state) => state.products);
  const productList = products.Products;
  //add Product or display product
  const [display, setDisplay] = useState(true);
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
    productList && productList[0] && setActiv(productList[0]._id);
  }, [productList[0]]);
  const [myProduct, setMyProduct] = useState({
    name: "",
    descriptions: "",
    image: { defaultImage },
    status: "",
    price: "",
    currency: "",
    assignedTo: "",
  });
  useEffect(() => {
    setMyProduct(productList.filter((el) => el._id == activ)[0]);
  }, [activ]);
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
    let body = document.getElementsByTagName("body")[0];
    let widthBody = parseInt(
      window.getComputedStyle(body).getPropertyValue("width")
    );
    if (widthBody < 860) {
      prodList.current.style.transform = "translateX(-100%)";
      setShow(false);
    }
  };
  return (
    <div className="container-fluid border border-secondary ">
      <div className="row ">
        <div
          className="product-add col-2  border border-secondary  d-flex flex-column p-2"
          ref={prodList}
        >
          <button
            className={`btn btn-${
              show ? "danger" : "success"
            } rounded-circle btn-show`}
            onClick={handleshow}
          >
            <i className="fas fa-arrows-alt-h"></i>
          </button>
          <button
            onClick={() => {
              setDisplay(false);
              setActiv("");
              dispatch(clearErrProd());
            }}
            className="btn btn-outline-primary  d-flex justify-content-around align-items-center m-2 mx-auto p-2 w-100  "
          >
            <i className="fas fa-plus "></i> <span>Add Product</span>
          </button>
          {productList.map((el, i) => (
            <Link
              key={i}
              to="#"
              className={`activLink ${activIt(el._id)}`}
              style={{ width: "100%" }}
              onClick={() => {
                setActiv(el._id);
                setDisplay(true);
              }}
            >
              {el.name}
            </Link>
          ))}
        </div>
        <div
          className="product-info col-10  border border-secondary "
          onClick={translateAdd}
        >
          {display ? (
            <>
              {myProduct ? (
                <>
                  {" "}
                  {window.innerWidth > 860 ? (
                    <ProductDetails product={myProduct} />
                  ) : (
                    <ProdCardRes product={myProduct} />
                  )}
                </>
              ) : (
                <h1>Wait...</h1>
              )}
            </>
          ) : (
            <AddProduct />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
