import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMyProducts, clearErrProd } from "../js/actions/productAction";
import AddProduct from "../components/AddProduct";
import ProductDetails from "../components/ProductDetails";

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
  const [myProduct, setMyProduct] = useState({ name: "" });
  useEffect(() => {
    setMyProduct(productList.filter((el) => el._id == activ)[0]);
  }, [activ]);
  return (
    <div className="container-fluid border border-secondary ">
      <div className="row">
        <div
          className="col-2  border border-secondary  d-flex flex-column p-2"
          style={{ padding: "0", height: "90vh" }}
        >
          <button
            onClick={() => {
              setDisplay(false);
              setActiv("");
              dispatch(clearErrProd());
            }}
            className="btn btn-outline-primary  d-flex justify-content-around align-items-center m-2 mx-auto p-2 w-100 "
          >
            <i className="fas fa-plus "></i> <span>Add Product</span>
          </button>
          {productList.map((el) => (
            <Link
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
          className="col-10  border border-secondary "
          style={{ height: "90vh" }}
        >
          {display ? (
            <>
              {myProduct ? (
                <ProductDetails product={myProduct} />
              ) : (
                <h2 className="alert alert-danger text-center w-75 mt-3 mx-auto">
                  You have no product or bad connection
                </h2>
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
