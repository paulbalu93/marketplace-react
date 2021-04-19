import React, { Component } from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
const style = {
  icon: {
    fontSize: "2rem",
    color: "whitesmoke",
    margin: "0 10px",
  },
};

class AppNavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">Strivazon </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/backoffice">Backoffice</Link>
        </Nav>
        <Form inline>
          <FormControl
            value={this.props.query}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => this.props.searchHandler(e)}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Link to="/cart">
          <div>
            <BiCartAlt style={style.icon} />
            {this.props.totalInCart}
          </div>
        </Link>
      </Navbar>
    );
  }
}

export default AppNavBar;
