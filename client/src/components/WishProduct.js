import React from "react";
import { useSelector } from "react-redux";
import { convert, currencySymbole } from "../currency";

const WishProduct = ({ el }) => {
  const currencies = useSelector((state) => state.currency);

  return (
    <div className="row " style={{ lineHeight: " 300%" }}>
      <span className="col-1 mx-3   text-center">
        <img
          src={el.image}
          alt=""
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </span>
      <span className="col-2  ">{el.name}</span>
      <span className="col overflow-auto " style={{ maxHeight: "140px" }}>
        {el.descriptions}
      </span>
      <span className="col-1 mx-3  ">{el.status}</span>
      <span className="col-1 mx-3  ">
        <span className="d-flex align-items-center border">
          {currencies.currency ? (
            <span style={{ fontWeight: "bold" }}>
              {Math.round(
                el.price * convert(currencies.currency, el.currency)
              ) + currencySymbole(currencies.currency)}
            </span>
          ) : (
            <span style={{ fontWeight: "bold" }}>
              &nbsp; {el.price}
              {currencySymbole(el.currency)}
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

export default WishProduct;
