import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Loading = () => {
  const history = useHistory();
  setTimeout(() => {
    history.push("/wishs");
  }, 1000);
  return <div>Loading....</div>;
};

export default Loading;
