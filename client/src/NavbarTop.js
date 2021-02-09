import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light px-2">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarNavDropdown"
          >
            <ul class="navbar-nav ">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  My Wishlists
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  My Products
                </a>
              </li>
              {/* dropDown */}

              {/* fin dropdown */}
            </ul>
            <ul className="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
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
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      {user.lname ? user.lname : "User"}
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Compte
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item " href="#">
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
              <li class="nav-item dropdown  ">
                <a
                  style={{ width: "50px" }}
                  class="nav-link dropdown-toggle "
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {money.val}
                </a>
                <ul
                  class="dropdown-menu "
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li name="val" value="Dollar" onClick={handleClick}>
                    <a class="dropdown-item" href="#">
                      Dollar
                    </a>
                  </li>
                  <li name="val" value="dinar" onClick={handleClick}>
                    <a class="dropdown-item" href="#">
                      Dinar
                    </a>
                  </li>
                  <li name="val" value="euro" onClick={handleClick}>
                    <a class="dropdown-item" href="#">
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
