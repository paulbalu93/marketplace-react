import React, { Component } from "react";
import { Alert, Container } from "react-bootstrap";
import ModalForm from "./ModalForm";
import ProductsTable from "./ProductsTable";
import services from "../services";
class Backoffice extends Component {
  state = {
    showAlert: false,
    success: null,
    products: [],
  };
  handleAlert = (response, show) => {
    this.setState({ showAlert: show });

    if (response) {
      this.setState({ success: true });
    } else {
      this.setState({ success: false });
    }
  };

  componentDidMount = () => {
    this.fetchData();
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps.query !== this.props.query) {
      await this.fetchData();
      const filtered = this.state.products.filter((product) =>
        product.name.toLowerCase().includes(this.props.query.toLowerCase())
      );
      console.log(filtered);
      this.setState({ products: filtered });
    }
  };
  fetchData = async () => {
    // try {
    //   const response = await Promise.all(
    //     urls.map(async (url) => {
    //       const response = await fetch(url, {
    //         headers: {
    //           Authorization:
    //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
    //         },
    //       });
    //       return response.json();
    //     })
    //   );

    //   const response = await fetch(
    //     "https://striveschool-api.herokuapp.com/api/product/",
    //     {
    //       headers: {
    //         Authorization:
    //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
    //       },
    //     }
    //   );

    //   if (response.ok) {
    //     const data = await response.json();
    //     this.setState({ products: data });
    //   }

    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
    services.fetchData((data) => {
      this.setState({ products: data });
    });
  };

  render() {
    console.log(this.props.query);
    return (
      <Container className="my-3">
        {this.state.showAlert && (
          <Alert
            className=" my-3"
            variant={this.state.success ? "success" : "danger"}
            dismissible
            onClose={() => this.setState({ showAlert: false })}
          >
            <Alert.Heading>
              {this.state.success ? "Data posted" : "Error"}
            </Alert.Heading>
          </Alert>
        )}
        <ModalForm
          handleAlert={this.handleAlert}
          refetch={this.fetchData}
          method={"POST"}
        />
        <ProductsTable
          products={this.state.products}
          refetch={this.fetchData}
          handleAlert={this.handleAlert}
        />
      </Container>
    );
  }
}

export default Backoffice;

// "https://striveschool-api.herokuapp.com/api/product/",
// {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
//   },
// }
