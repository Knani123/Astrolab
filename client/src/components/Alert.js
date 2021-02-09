import React from "react";

const Alert = ({ message }) => {
  const handleDisplay = () => {
    if (!message) {
      return "none";
    } else {
      setTimeout(() => {
        return "none";
      }, 3000);
    }
  };
  return (
    <div
      className=" alert   alert-danger "
      style={{
        // transition: "0.4s",
        // top: "0",
        // left: "50%",
        padding: "0",
        display: { handleDisplay },
      }}
    >
      {message && message.map((el) => <h1>{el.msg}</h1>)}
    </div>
  );
};

export default Alert;
