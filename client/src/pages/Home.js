import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser } from "../js/actions/authAction";
import Alert from "../components/Alert";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  // alert login or register
  const [showAlert, setShowAlert] = useState(false);
  const auth = useSelector((state) => state.auth);
  const alertMSG = () => {
    !auth.isAuth && setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  return (
    <div
      className="d-flex flex-column  align-items-center  vh-100  "
      style={{ backgroundColor: "#c0c2c5" }}
    >
      <h1>Home Page </h1>
      {showAlert && <Alert ops={[{ msg: "You must login or regiter" }]} />}
      <div
        className="d-flex flex-column shadow form-group p-5 m-5 border border-success alert-light rounded "
        style={{ width: "400px" }}
      >
        <Link to={auth.isAuth && `/profile`} onClick={alertMSG}>
          <btn className="btn btn-success m-2 w-100">
            <i className="fas fa-signature"></i> Profile
          </btn>
        </Link>
        <Link to={auth.isAuth && `/wishs`} onClick={alertMSG}>
          <btn className="btn btn-primary m-2 w-100">
            <i className="far fa-heart "></i> My Wishlists
          </btn>
        </Link>
        <Link to={auth.isAuth && `/products`} onClick={alertMSG}>
          <btn className="btn btn-warning  m-2 w-100">
            <i className="far fa-file-alt"></i> My Products
          </btn>
        </Link>
        {!auth.isAuth && (
          <div>
            <hr />
            <span className="d-flex justify-content-around">
              <Link to="/login">
                <button className="btn btn-outline-success">SignIn</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline-info">Register</button>
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
