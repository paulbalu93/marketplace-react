import React, { Component } from "react";
import { Row } from "react-bootstrap";
import SingleProduct from "./SingleProduct";

class SideCart extends Component {
  state = {
    total: 0,
  };
  totalSum = () => {
    const total = this.props.productsInCart
      .map((product) => product.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.setState({ total: total });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.productsInCart !== this.props.productsInCart) {
      this.totalSum();
    }
  };
  render() {
    console.log(this.state.total);
    return (
      <Row className="row-cols-lg-1">
        <p>{this.state.total}</p>
        {this.props.productsInCart.map((product) => (
          <SingleProduct
            product={product}
            isInCart={this.props.isInCart}
            onClick={() => this.props.deleteFromCart(product)}
          />
        ))}
      </Row>
    );
  }
}

export default SideCart;
