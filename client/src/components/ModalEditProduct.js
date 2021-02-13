import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWishList } from "../js/actions/wishAction";
import { editProduct, clearErrProd } from "../js/actions/productAction";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalEditProduct = ({ product }) => {
  const history = useHistory();
  const {
    _id,
    name,
    descriptions,
    image,
    status,
    price,
    currency,
    assignedTo,
  } = product;
  const dispatch = useDispatch();
  //load wishList to map them in whislist select
  const wish = useSelector((state) => state.wish);
  const wishlist = wish.wishs;
  const [info, setInfo] = useState({
    name: "",
    descriptions: "",
    image: "",
    status: "",
    price: "",
    currency: "",
    assignedTo: "",
  });
  useEffect(() => {
    setInfo({ name, descriptions, image, status, price, currency, assignedTo });
  }, [product]);
  const clearInfo = () => {
    setInfo({
      name: "",
      descriptions: "",
      image: "",
      status: "",
      price: "",
      currency: "",
      assignedTo: "",
    });
  }; // handle modal
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    dispatch(clearErrProd);
    setInfo({
      name,
      descriptions,
      image,
      status,
      price,
      currency,
      assignedTo,
    });

    // dispatch(clearErrwish());
  }

  function closeModal() {
    setIsOpen(false);
    // history.push("/load");
    // dispatch(clearErrwish());
  }

  //dispatch Add action

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(_id, info));
    console.log("Hi");
  };
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  //handle errors
  const [ops, setOps] = useState([{ msg: "" }]);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    setOps(products.errors);
    setTimeout(() => {
      setOps([]);
    }, 3000);
  }, [products.errors]);
  console.log("ops", ops);
  console.log(products.errors && products.errors[0].msg);
  //get product list
  return (
    <div>
      <span onClick={openModal}>
        <i className="far fa-edit"></i> Edit
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex align-items-center justify-content-between align-items-center  mb-3  ">
          <h4>Edit Product</h4>
          <p className=" text-danger">{ops && ops[0] && ops[0].msg}</p>
          <i
            className="fas fa-times "
            onClick={closeModal}
            onMouseOver={(e) => {
              e.target.style.cursor = "pointer";
              e.target.style.color = "red";
              e.target.style.transition = "0s";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "";
              e.target.style.transition = "2s";
            }}
          ></i>
        </div>
        <form
          className="border border-dark d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <div className="d-flex justify-content-evenly my-2">
            <span className="d-flex flex-column">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                required
                value={info.name}
                onChange={handleChange}
              />
            </span>
            <span className="d-flex flex-column">
              <label htmlFor="price">Price</label>
              <input
                value={info.price}
                onChange={handleChange}
                type="number"
                id="price"
                className="form-control"
                required
              />
            </span>
            <span className="d-flex flex-column">
              <label htmlFor="">Currency</label>
              <select
                id="currency"
                className="select1"
                required
                value={info.currency}
                onChange={handleChange}
              >
                <option value="">-- Currency --</option>
                <option value="USD">Dollar</option>
                <option value="EUR">Euro</option>
                <option value="TND">Dinar</option>
              </select>
            </span>
          </div>
          <span className="d-flex flex-column px-4 pb-2">
            <label htmlFor="descriptions">Description</label>
            <textarea
              value={info.descriptions}
              required
              onChange={handleChange}
              onChange={handleChange}
              name=""
              id="descriptions"
              cols="30"
              rows="3"
              className="from-control"
            ></textarea>
          </span>
          <div className="d-flex justify-content-evenly">
            <div className="d-flex flex-column">
              <label htmlFor="">Wishlist</label>
              <select
                className="select"
                required
                id="assignedTo"
                value={info.assignedTo}
                onChange={handleChange}
              >
                <option value="">-- Choise WishList --</option>
                {wishlist &&
                  wishlist.map((el) => (
                    <option value={el._id}>{el.name}</option>
                  ))}
              </select>
            </div>
            <div className="d-flex flex-column ">
              <label htmlFor="status">Status</label>
              <select
                className="select"
                id="status"
                required
                value={info.status}
                onChange={handleChange}
              >
                <option value="">-- Choise Status --</option>
                <option value="To buy">To buy</option>
                <option value="Bought">Bought</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4 m-1">
            <button
              className="m-1 btn btn-outline-primary"
              type="reset"
              onClick={clearInfo}
            >
              Cancel
            </button>
            <button className="m-1 btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalEditProduct;
