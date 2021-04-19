import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
class ModalForm extends Component {
  state = {
    showModal: false,
    productDetails: this.props.product ? this.props.product : {},
  };

  onChangeHandler = (e) => {
    this.setState({
      productDetails: {
        ...this.state.productDetails,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  submitData = async () => {
    const url = this.props.productId
      ? "https://striveschool-api.herokuapp.com/api/product/" +
        this.props.productId
      : "https://striveschool-api.herokuapp.com/api/product/";
    try {
      const response = await fetch(url, {
        method: this.props.method,
        body: JSON.stringify(this.state.productDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
        },
      });
      console.log(response);
      if (response.ok) {
        this.setState({ showModal: false });
        this.props.handleAlert(true, true);
        this.props.refetch();
      } else {
        this.setState({ showModal: false });
        this.props.handleAlert(false, true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <>
          <Button
            variant={this.props.method === "PUT" ? "success" : "primary"}
            onClick={() => {
              this.setState({ showModal: true });
              this.props.handleAlert(undefined, false);
            }}
          >
            {this.props.method === "PUT"
              ? "Update the product"
              : "Add a new product"}
          </Button>

          <Modal
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.productDetails.name}
                    placeholder="Enter name"
                    id="name"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    placeholder="Enter Description"
                    value={this.state.productDetails.description}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Product Brand</Form.Label>
                  <Form.Control
                    type="text"
                    id="brand"
                    value={this.state.productDetails.brand}
                    placeholder="Enter Brand"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Product price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    id="price"
                    value={this.state.productDetails.price}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Product Image url</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter image url"
                    id="imageUrl"
                    value={this.state.productDetails.imageUrl}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary" onClick={() => this.submitData()}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

export default ModalForm;
