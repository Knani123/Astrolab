import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NavbarTop from "./NavbarTop";
import "bootstrap/dist/css/bootstrap.min.css";
import Wishs from "./pages/Wishs";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <NavbarTop />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/wishs" component={Wishs} />
        <PrivateRoute path="/products" component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
