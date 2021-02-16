import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convert, currencySymbole } from "../currency";

const WishProduct = ({ el }) => {
  const { currency } = el;
  //handle currency (i used fetch because axios coz cros problem)
  const currencies = useSelector((state) => state.currency);
  const [coeff, setCoeff] = useState("");

  //API  : https://free.currencyconverterapi.com/

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
    <div className="row align-items-center" style={{ lineHeight: " 300%" }}>
      <span className="col-1 mx-3   text-center ">
        <a href={el.image} target="_blank">
          <img
            alt="Product image"
            src={el.image}
            alt=""
            style={{ width: "100px" }}
            onMouseOver={(e) => {
              e.target.style.transition = "0.4s";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseOut={(e) => (e.target.style.transform = "scale(0.9)")}
          />
        </a>
      </span>
      <span className="col-2  ">{el.name}</span>
      <span
        className="col border overflow-auto  w-75"
        style={{ height: "100px", maxHeight: "140px" }}
      >
        {el.descriptions}
      </span>
      <span
        className={`col-1 mx-3 btn btn-outline-${
          el.status == "To buy" ? "success" : "danger"
        }`}
        style={{ height: "40px" }}
      >
        {el.status}
      </span>
      <span className="col-1 mx-3  ">
        <span className="d-flex align-items-center border">
          {currencies.currency ? (
            <span style={{ fontWeight: "bold" }}>
              &nbsp;
              {Math.round(
                el.price * /* coeff */ convert(currencies.currency, el.currency)
              )}
              &nbsp;{currencySymbole(currencies.currency)}
            </span>
          ) : (
            <span style={{ fontWeight: "bold" }}>
              &nbsp; {el.price}&nbsp;
              {currencySymbole(el.currency)}
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

export default WishProduct;
