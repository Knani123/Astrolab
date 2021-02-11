import React from "react";

const Alert = ({ ops }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "130px",
        margin: "0",
        padding: "0",
      }}
      className="alert alert-danger"
    >
      {ops && ops.map((el) => <h1>{el.msg}</h1>)}
    </div>
  );
};

export default Alert;
