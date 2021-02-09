import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../js/actions/authAction";
const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    setUser({ ...user, ...auth.user });
  }, [auth]);

  return (
    <div>
      Bonjour:{user.fname} {user.lname}
    </div>
  );
};

export default Profile;
