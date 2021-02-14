import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrwish } from "../js/actions/wishAction";
import { addWish, editWish } from "../js/actions/wishAction";
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

const EditWish = ({ myWish }) => {
  //useHistory
  const history = useHistory();
  const dispatch = useDispatch();

  //handle errors
  const wish = useSelector((state) => state.wish);
  const [ops, setOps] = useState("");

  useEffect(() => {
    setOps(wish.errors && wish.errors[0].msg);
    console.log("wish", wish);
  }, [wish.errors]);
  //   handle info
  const [info, setInfo] = useState({ name: myWish && myWish.name });
  useEffect(() => {
    setInfo({ name: myWish && myWish.name });
  }, [myWish]);
  // handle modal

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    dispatch(clearErrwish());
  }

  function closeModal() {
    setIsOpen(false);
    history.push("/load2");
    dispatch(clearErrwish());
  }
  const clearInfo = () => {
    setInfo({ name: "" });
  };
  //dispatch Add action

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editWish(myWish && myWish._id, info));

    // setTimeout(() => {
    //   closeModal();
    // }, 15000);
  };
  const handleChange = (e) => {
    setInfo({ [e.target.id]: e.target.value });
  };

  return (
    <div>
      <span
        onClick={openModal}
        onMouseOver={(e) => {
          e.target.style.color = "#FFC312 ";
          e.target.style.cursor = "pointer";
        }}
        onMouseOut={(e) => (e.target.style.color = "")}
      >
        <i className="far fa-edit"></i> Edit
      </span>

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
          <h4>Edit wishList</h4>
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
              value={info.name}
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

export default EditWish;
