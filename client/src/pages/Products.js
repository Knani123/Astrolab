import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProduct from "../components/AddProduct";
const productList = [
  {
    _id: 1,
    title: "sport",
    Description: "blablabla",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    Status: "to buy",
    Price: 700,
  },
  {
    _id: 2,
    title: "Hunt",
    Description: "blablabla",
    image: "Image",
    Status: "Bought",
    Price: 800,
  },
];
const Products = () => {
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

  const [myProduct, setMyProduct] = useState({ title: "" });
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
              {el.title}
            </Link>
          ))}
        </div>
        <div
          className="col-10  border border-secondary "
          style={{ height: "90vh" }}
        >
          {display ? <div>{myProduct && myProduct.title}</div> : <AddProduct />}
        </div>
      </div>
    </div>
  );
};

export default Products;
