import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { logOut } from "./js/actions/authAction";
import myImage from "./gallery/myImage.PNG";
import Alert from "./components/Alert";
const NavbarTop = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // alert login or register
  const [showAlert, setShowAlert] = useState(false);
  const alertMSG = () => {
    !auth.isAuth && setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  //get User
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    setUser({ ...user, ...auth.user });
  }, [auth]);

  //change currency
  const [money, setMoney] = useState({ val: "TND" });
  const handleClick = (e) => {
    setMoney({ val: e.target.textContent });
  };

  //display NavBar according to pathname
  const location = useLocation();
  const handleDisplay = (loc) => {
    if (loc == "/register" || loc == "/login") {
      return "none";
    }
  };
  //log out
  const deconnect = () => {
    if (auth.isAuth) {
      dispatch(logOut());
    } else {
      history.push("/register");
    }
  };
  return (
    <div style={{ display: handleDisplay(location.pathname) }}>
      <div
        className="w-100 position-absolute"
        style={{ top: "0", left: "35%" }}
      >
        {showAlert && <Alert ops={[{ msg: "You must login or regiter" }]} />}
      </div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light px-2"
        style={{ paddingBottom: "0" }}
      >
        <Link
          class={`navbar-brand ${location.pathname == "/" && "text-primary"}`}
          to="/"
        >
          <i className="fas fa-home"></i> Home
        </Link>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <NavLink
                  className="nav-link  h-100"
                  aria-current="page"
                  to={auth.isAuth && `/wishs`}
                  onClick={alertMSG}
                  activeClassName="text-primary "
                  activeStyle={{ borderBottom: "2px solid blue" }}
                >
                  <i className="far fa-heart "></i> My Wishlists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={auth.isAuth && `/products`}
                  onClick={alertMSG}
                  activeClassName="text-primary"
                  activeStyle={{ borderBottom: "2px solid blue" }}
                >
                  <i className="far fa-file-alt"></i> My Products
                </NavLink>
              </li>
              {/* dropDown */}

              {/* fin dropdown */}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={myImage}
                    alt="image"
                    width="25px"
                    style={{ borderRadius: "50%" }}
                  />
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={auth.isAuth ? "/profile" : "/login"}
                    >
                      <button
                        className="btn btn-success text-capitalize"
                        style={{
                          padding: "2px",
                          fontSize: "12px",
                          color: "white",
                        }}
                      >
                        {auth.isAuth ? (
                          <>
                            <i className="fas fa-signature"></i>{" "}
                            {user.fname ? user.fname : "User"}
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sign-in-alt"></i> SignIn
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item ">
                      <button
                        onClick={deconnect}
                        className={`text-light btn btn-${
                          auth.isAuth ? "danger" : "info"
                        }`}
                        style={{
                          padding: "2px",
                          fontSize: "12px",
                        }}
                      >
                        {auth.isAuth ? (
                          <>
                            <i className="fas fa-power-off"></i> Log out
                          </>
                        ) : (
                          <>
                            <i className="fas fa-file-contract "></i> Register
                          </>
                        )}
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* doropdown 2 */}
              <li className="nav-item dropdown  ">
                <a
                  style={{ width: "50px" }}
                  className="nav-link dropdown-toggle "
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {money.val}
                </a>
                <ul
                  className="dropdown-menu "
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li name="val" value="Dollar" onClick={handleClick}>
                    <a className="dropdown-item" href="#">
                      Dollar
                    </a>
                  </li>
                  <li name="val" value="dinar" onClick={handleClick}>
                    <a className="dropdown-item" href="#">
                      Dinar
                    </a>
                  </li>
                  <li name="val" value="euro" onClick={handleClick}>
                    <a className="dropdown-item" href="#">
                      Euro
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarTop;
