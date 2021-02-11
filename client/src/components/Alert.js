import React from "react";

const Alert = ({ ops }) => {
  let T = [{ msg: "Login" }];
  if (ops != null) {
    T = ops;
    console.log("opsss", ops);
  }
  console.log(T);
  return (
    <div
      style={{
        position: "absolute",
        top: "130px",
        margin: "0",
        // padding: "0",
      }}
      className="alert alert-danger p-2"
    >
      {T.map((el) => (
        <h1>{el.msg}</h1>
      ))}
    </div>
  );
};

export default Alert;
