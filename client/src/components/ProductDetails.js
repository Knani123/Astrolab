import React from "react";

const ProductDetails = ({ product }) => {
  const { _id, title, Description, image, Status, Price } = product;
  return (
    <div className="mt-5  mx-3">
      <div className="d-flex m-2">
        <img
          src="https://whyfutz.com/wp-content/uploads/2020/04/product.jpg"
          alt=""
          width="35%"
          max-width="200px"
        />
        <div
          style={{ width: "35%" }}
          className="d-flex flex-column justify-content-between m-4"
        >
          <span>
            <h1>{title}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio, aspernatur? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Rerum, cum.
            </p>
          </span>
          <span className="d-flex">
            Price: <h5>{Price}</h5>
          </span>
        </div>
        <span></span>
      </div>
    </div>
  );
};

export default ProductDetails;
