import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convert, currencySymbole } from "../currency";
import "./cmp.css";
const WishProductGrid = ({ el }) => {
  const { currency } = el;
  //handle currency (i used fetch because axios coz cros problem)
  const currencies = useSelector((state) => state.currency);
  const [coeff, setCoeff] = useState("");

  const moneymoney = () => {
    fetch(
      // `https://free.currconv.com/api/v7/convert?q=${currency}_${currencies.currency}&compact=ultra&apiKey=7ba4fa27f0e8d7b0f3e7`
      `https://free.currconv.com/api/v7/convert?q=${currency}_${currencies.currency}&compact=ultra&apiKey=4cd0e09de123f7148e9b`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("API Data", data);
        let dataVal = Math.round(Object.values(data)[0] * 100) / 100;
        setCoeff(isNaN(dataVal) ? "1" : dataVal);
      });
  };
  useEffect(() => {
    // moneymoney();
  }, [currencies.currency]);
  /* convert(currencies.currency, currency)  function return sable currency
   & currencySymbole set the currency symboles*/
  return (
    <div className="col colGrid">
      <div
        className="card shadow mx-auto my-2"
        style={{ width: "15rem", height: "400px" }}
      >
        <img
          alt="Product image"
          className="card-img-top"
          src={el.image}
          alt="Card image cap"
          style={{ height: "180px" }}
        />
        <div className="card-body position-relative">
          <h6 className="card-title">{el.name}</h6>
          <p className="card-text overflow-auto" style={{ height: "100px" }}>
            {el.descriptions}
          </p>
          <span
            className="d-flex justify-content-between align-items-center position-absolute  "
            style={{ height: "40px", bottom: "10px" }}
          >
            <span
              className={`  btn btn-outline-${
                el.status == "To buy" ? "success" : "danger"
              }`}
            >
              {el.status}
            </span>
            <span>
              {currencies.currency ? (
                <span
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  className="m-2 "
                >
                  &nbsp;
                  {Math.round(
                    el.price *
                      /* coeff */ convert(currencies.currency, el.currency)
                  )}
                  &nbsp;{currencySymbole(currencies.currency)}
                </span>
              ) : (
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  &nbsp; {el.price}&nbsp;
                  {currencySymbole(el.currency)}
                </span>
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishProductGrid;
