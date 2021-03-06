import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import { loginUser, clearErr } from "../js/actions/authAction";
import "./pages.css";
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // catch errors
  const [ops, setOps] = useState([{ msg: "" }]);
  useEffect(() => {
    setOps(auth.errors);
    setTimeout(() => setOps([{ msg: "" }]), 3000);
  }, [auth.errors]);
  //send info to logIn
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(info));
  };
  const handleChnage = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    auth.isAuth && history.push("/");
  }, [auth]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center  vh-100  login">
      <h1>Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column shadow form-group p-4 m-4 border border-success alert-light rounded position-relative from-login "
        // style={{ width: "350px" }}
      >
        <h5 className="position-relative text-danger">{ops && ops[0].msg}</h5>

        <span className="position-absolute m-2" style={{ top: "0", left: "0" }}>
          <Link to="/" className="text-decoration-none">
            <i className="fas fa-home"></i> Home
          </Link>
        </span>
        <label htmlFor="email" className="mb-1">
          Email:
        </label>
        <input
          autoFocus={true}
          required
          className="form-control p-2"
          placeholder="E-mail adress"
          type="email"
          id="email"
          value={info.email}
          onChange={handleChnage}
        />
        <label htmlFor="password" className="mt-3 mb-1">
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
        <button type="submit " className="btn btn-success w-50 m-auto mb-3  ">
          SignIn
        </button>
        <hr />
        <div className="d-flex">
          <p>Do you want to have access?</p> &nbsp;
          <Link
            to="/register"
            className=" text-primary text-decoration-none "
            onClick={() => dispatch(clearErr())}
          >
            Register
          </Link>
        </div>
      </form>
      {/* <Alert message={auth.errors} /> */}
    </div>
  );
};

export default Login;
