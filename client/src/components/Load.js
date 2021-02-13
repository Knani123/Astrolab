import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Load = () => {
  const history = useHistory();
  setTimeout(() => {
    history.push("/products");
  }, 1000);
  return <div>Loading....</div>;
};

export default Load;
