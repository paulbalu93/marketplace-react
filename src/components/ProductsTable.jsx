import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import ModalForm from "./ModalForm";
// const urls = [
//   "https://striveschool-api.herokuapp.com/api/product/",
//   "https://striveschool-api.herokuapp.com/api/product/",
// ];

class ProductsTable extends Component {
  deleteProduct = async (id) => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/product/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
          },
        }
      );
      if (response.ok) {
        this.props.refetch();
      } else {
        alert("not ok");
      }
    } catch (error) {
      console.log(error);
      alert("not ok");
    }
  };

  render() {
    return (
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>ImageUrl</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>
                <img style={{ height: "50px" }} src={product.imageUrl} />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => this.deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
              <td>
                <ModalForm
                  product={product}
                  productId={product._id}
                  method={"PUT"}
                  refetch={this.props.refetch}
                  handleAlert={this.props.handleAlert}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default ProductsTable;
