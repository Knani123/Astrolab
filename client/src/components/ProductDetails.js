import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../js/actions/wishAction";
import { deleteproduct } from "../js/actions/productAction";
import ModalEditProduct from "./ModalEditProduct";
import { convert, currencySymbole } from "../currency";
import "./cmp.css";
const ProductDetails = ({ product }) => {
  //destruction product
  const { _id, name, descriptions, image, status, price, currency } = product;
  //load wishList
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishList());
  }, []);

  //handle currency (i used fetch because axios coz cros problem)
  const currencies = useSelector((state) => state.currency);
  const [coeff, setCoeff] = useState("");

  const moneymoney = () => {
    fetch(
      `https://free.currconv.com/api/v7/convert?q=${currency}_${currencies.currency}&compact=ultra&apiKey=7ba4fa27f0e8d7b0f3e7`
      // `https://free.currconv.com/api/v7/convert?q=${currency}_${currencies.currency}&compact=ultra&apiKey=4cd0e09de123f7148e9b`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data", data);
        let dataVal = Math.round(Object.values(data)[0] * 100) / 100;
        setCoeff(isNaN(dataVal) ? "1" : dataVal);
      });
  };
  useEffect(() => {
    // moneymoney();
  }, [currencies.currency]);
  /* convert(currencies.currency, currency)  function return sable currency
   & currencySymbole set the currency symboles*/

  //delete wish
  function deleteIt() {
    const confirm = window.confirm(`Do you really want to delete ${name} `);
    if (confirm) {
      dispatch(deleteproduct(_id));
    }
  }
  return (
    <div className="prodduct-details mt-5  mx-3 ">
      <div className="d-flex m-4 ">
        <img
          src={image}
          alt=""
          width="50%"
          style={{ height: "300px" }}
          className=" mt-5 border shadow"
          alt="Product image"
        />
        <div
          // style={{ width: "300px" }}
          style={{ height: "220px" }}
          className="d-flex flex-column justify-content-between m-4  "
        >
          <span>
            <h3 className="my-3 text-capitalize">{name}</h3>
            <p
              style={{ maxHeight: "150px", width: "300px" }}
              className="overflow-auto "
            >
              {descriptions}
            </p>
          </span>
          <span className="d-flex align-items-center border">
            <span> Price: </span>
            {currencies.currency ? (
              <span style={{ fontWeight: "bold" }}>
                &nbsp;
                {Math.round(
                  price * /*coeff*/ convert(currencies.currency, currency)
                )}
                &nbsp;
                {currencySymbole(currencies.currency)}
              </span>
            ) : (
              <span style={{ fontWeight: "bold" }}>
                &nbsp; {price}&nbsp;
                {currencySymbole(currency)}
              </span>
            )}
          </span>
        </div>
        <span className="d-flex flex-column my-4">
          <ModalEditProduct product={product} />
          <span style={{ cursor: "pointer", color: "red" }} onClick={deleteIt}>
            <i className="far fa-trash-alt "></i> Delete
          </span>
        </span>
      </div>
      <p className=" m-2">
        Wishlist:{" "}
        <span
          className="text-info"
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          {wishlist &&
            product &&
            wishlist.find((el) => el._id == product.assignedTo) &&
            wishlist.find((el) => el._id == product.assignedTo).name}
        </span>
      </p>
      <p className="m-2">
        Status:{" "}
        <span
          className={` text-${status == "To buy" ? "success" : "danger"}`}
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          {status}
        </span>
      </p>
    </div>
  );
};

export default ProductDetails;
