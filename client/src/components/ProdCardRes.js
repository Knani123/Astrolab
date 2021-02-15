import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../js/actions/wishAction";
import { deleteproduct } from "../js/actions/productAction";
import ModalEditProduct from "./ModalEditProduct";
import { convert, currencySymbole } from "../currency";
import "./cmp.css";

const ProdCardRes = ({ product }) => {
  console.log(product);
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
  console.log("typeof coeff", coeff == NaN, typeof coeff);
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
    <div>
      <div className="d-flex justify-content-end">
        <ModalEditProduct product={product} />
        <span
          style={{ cursor: "pointer", color: "red" }}
          onClick={deleteIt}
          className="m-2"
        >
          <i className="far fa-trash-alt "></i> Delete
        </span>
      </div>
      <div class="card">
        <img class="card-img-top" src={image} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">{descriptions}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">
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
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProdCardRes;
