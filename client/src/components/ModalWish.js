import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrwish } from "../js/actions/wishAction";
import Modal from "react-modal";
import { addWish } from "../js/actions/wishAction";
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

const ModalWish = () => {
  //handle errors
  const wish = useSelector((state) => state.wish);
  const [ops, setOps] = useState("");
  useEffect(() => {
    setOps(wish.errors && wish.errors[0].msg);
  }, [wish.errors]);
  // handle modal
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ name: "" });
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    dispatch(clearErrwish());
  }

  function closeModal() {
    setIsOpen(false);
    dispatch(clearErrwish());
  }
  const clearInfo = () => {
    setInfo({ name: "" });
  };
  //dispatch Add action

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWish(info));
    setTimeout(() => {
      closeModal();
    }, 15000);
  };
  const handleChange = (e) => {
    setInfo({ [e.target.id]: e.target.value });
  };
  return (
    <div>
      <button
        className="btn btn-outline-primary  d-flex justify-content-around align-items-center my-2 mx-auto p-2 w-100"
        onClick={openModal}
      >
        <i className="fas fa-plus "></i> <span>Add wishlist</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className="d-flex align-items-center justify-content-between  mb-3"
          style={{ width: "400px" }}
        >
          <h4>Add wishList</h4>
          <i
            className="fas fa-times "
            style={{ cursor: "pointer" }}
            onClick={closeModal}
          ></i>
        </div>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column form-group "
        >
          <div className="px-5 mb-5">
            <label htmlFor="name" className="text-secondary">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control p-2 "
              placeholder="Add Name"
              required
              onChange={handleChange}
            />
          </div>
          <p className="text-center text-danger">{ops}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              onClick={closeModal}
              className="btn btn-outline-primary m-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary m-1">
              Done
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalWish;
