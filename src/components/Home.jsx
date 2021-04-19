import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import services from "../services";
import SideCart from "./SideCart";
import SingleProduct from "./SingleProduct";

class Home extends Component {
  state = {
    products: [],
    brands: [],
    checked: [],
    cartProducts: [],
  };
  componentDidMount = () => {
    services.fetchData((data) => {
      this.setState({ products: data });
      this.setState({
        brands: [...new Set(data.map((product) => product.brand))],
      });
    });
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps.query !== this.props.query) {
      services.fetchData((data) => {
        const filtered = data.filter((product) =>
          product.name.toLowerCase().includes(this.props.query.toLowerCase())
        );

        this.setState({ products: filtered });
      });
    }
  };
  handleChecked = (e) => {
    //console.log(e.target.checked, e.target.value);

    if (e.target.checked) {
      this.setState({ checked: [...this.state.checked, e.target.value] });
    } else {
      this.setState({
        checked: this.state.checked.filter((barnd) => barnd !== e.target.value),
      });
    }

    services.fetchData((data) => {
      const filtered = data.filter((product) =>
        this.state.checked.includes(product.brand)
      );

      this.setState({ products: filtered });
    });
  };
  addToCart = (product) => {
    this.setState({
      cartProducts: [...this.state.cartProducts, product],
    });

    this.props.totalItemsInCart(this.state.cartProducts.length + 1);
  };
  deleteFromCart = (product) => {
    this.setState({
      cartProducts: this.state.cartProducts.filter(
        (prod) => prod._id !== product._id
      ),
    });
    this.props.totalItemsInCart(this.state.cartProducts.length - 1);
  };
  render() {
    console.log("cart", this.state.cartProducts);
    return (
      <Container fluid>
        <Row>
          <Col className="col-3">
            {this.state.brands.map((brand) => (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label={brand}
                  value={brand}
                  onChange={(e) => this.handleChecked(e)}
                />
              </Form.Group>
            ))}
          </Col>
          <Col className="col-6">
            <Row>
              {this.state.products.map((product) => (
                <SingleProduct
                  isInCart={false}
                  product={product}
                  onClick={() => this.addToCart(product)}
                />
              ))}
            </Row>
          </Col>
          <Col className="col-3">
            <SideCart
              productsInCart={this.state.cartProducts}
              isInCart={true}
              deleteFromCart={this.deleteFromCart}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
