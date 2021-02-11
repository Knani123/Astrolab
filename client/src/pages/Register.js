import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import { registerUser, clearErr } from "../js/actions/authAction";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // catch errors
  const [ops, setOps] = useState([]);

  useEffect(() => {
    setOps(auth.errors);
    setTimeout(() => setOps([]), 3000);
  }, [auth.errors]);

  //register info handle
  const [info, setInfo] = useState({
    lname: "",
    fname: "",
    phone: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(info));
  };
  const handleChnage = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    auth.isAuth && history.push("/profile");
  }, [auth]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center  vh-100 "
      style={{ backgroundColor: "#c0c2c5" }}
    >
      <h1>Register Page</h1>
      <Alert ops={ops} />
      <form
        onSubmit={handleSubmit}
        style={{ width: "400px" }}
        className="d-flex flex-column shadow form-group p-5 border border-success alert-light rounded "
      >
        <label htmlFor="fname" className="mb-1">
          First name:
        </label>
        <input
          autoFocus={true}
          type="text"
          id="fname"
          value={info.fname}
          onChange={handleChnage}
          placeholder="first name"
          className="form-control mb-3 p-2"
        />
        <label htmlFor="fname" className="mb-1">
          Last name:
        </label>
        <input
          type="text"
          id="lname"
          value={info.lname}
          onChange={handleChnage}
          placeholder="last name"
          className="form-control mb-3 p-2"
        />
        <label htmlFor="phone" className="mb-1">
          Phone number:
        </label>
        <input
          type="number"
          placeholder="Phone Number"
          id="phone"
          value={info.phone}
          onChange={handleChnage}
          className="form-control mb-3 p-2"
        />
        <label htmlFor="email" className="mb-1">
          Email:
        </label>
        <input
          required
          className="form-control mb-3 p-2"
          placeholder="E-mail adress"
          type="email"
          id="email"
          value={info.email}
          onChange={handleChnage}
        />
        <label htmlFor="password" className="mt-1 mb-1">
          Password:
        </label>
        <input
          required
          className="form-control mb-3 p-2"
          type="password"
          id="password"
          placeholder="Password"
          value={info.name}
          onChange={handleChnage}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <hr />
        <div className="m-1 d-flex">
          <p>Do you already have access? </p> &nbsp;
          <Link
            to="/login"
            className="text-success text-decoration-none"
            onClick={() => dispatch(clearErr())}
          >
            login
          </Link>
        </div>
      </form>
      {/* <Alert message={auth.errors} /> */}
    </div>
  );
};

export default Register;
