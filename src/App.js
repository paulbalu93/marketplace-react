import logo from "./logo.svg";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Backoffice from "./components/Backoffice";
class App extends React.Component {
  state = {
    query: "test",
    totalIncart: 0,
  };
  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  totalItemsInCart = (total) => {
    console.log(total);
    this.setState({ totalIncart: total });
  };
  render() {
    return (
      <Router>
        <AppNavBar
          query={this.state.query}
          searchHandler={this.searchHandler}
          totalInCart={this.state.totalIncart}
        />
        <Route
          path={"/"}
          exact
          render={(props) => (
            <Home
              title="Homepage"
              {...props}
              query={this.state.query}
              totalItemsInCart={this.totalItemsInCart}
            />
          )}
        />
        <Route
          path={"/backoffice"}
          render={(props) => <Backoffice {...props} query={this.state.query} />}
        />
        <Route path={"/cart"} render={(props) => <Cart {...props} />} />
      </Router>
    );
  }
}

export default App;
