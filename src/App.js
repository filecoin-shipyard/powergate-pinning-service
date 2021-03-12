import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pin from "./pages/Pin";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <center>
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/pin">
              <Pin />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route exact path="">
              <Login />
            </Route>
          </Switch>
        </Router>
        {/*         <div style={{ position: "absolute", bottom: "30px", width: "100%" }}>
          <Footer />
        </div> */}
      </Provider>
    </center>
  );
}

export default App;
