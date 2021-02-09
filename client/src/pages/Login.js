import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import { loginUser } from "../js/actions/authAction";
const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(info));
  };
  const handleChnage = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    auth.isAuth && history.push("/profile");
  }, [auth]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center  vh-100  "
      style={{ backgroundColor: "#c0c2c5" }}
    >
      <h1>Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column shadow form-group p-5 m-5 border border-success alert-light rounded "
        style={{ width: "400px" }}
      >
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
            className="btn btn-primary text-decoration-none "
          >
            Register
          </Link>
        </div>
      </form>
      <Alert message={auth.errors} />
    </div>
  );
};

export default Login;
