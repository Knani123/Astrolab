import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logOut } from "./js/actions/authAction";
import myImage from "./gallery/myImage.PNG";
const NavbarTop = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
    dispatch(logOut());
  };
  return (
    <div style={{ display: handleDisplay(location.pathname) }}>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light px-2"
        style={{ paddingBottom: "0" }}
      >
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
                  to="/wishs"
                  activeClassName="text-primary "
                  activeStyle={{ borderBottom: "2px solid blue" }}
                >
                  <i className="far fa-heart "></i> My Wishlists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/products"
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
                    <Link className="dropdown-item" to="/profile">
                      <button
                        className="btn btn-info text-capitalize"
                        style={{
                          padding: "2px",
                          fontSize: "12px",
                          color: "white",
                        }}
                      >
                        <i className="fas fa-signature"></i>{" "}
                        {user.fname ? user.fname : "User"}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item " href="#">
                      <button
                        onClick={deconnect}
                        className="btn btn-danger"
                        style={{
                          padding: "2px",
                          fontSize: "12px",
                        }}
                      >
                        <i className="fas fa-power-off"></i> log out
                      </button>
                    </a>
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
