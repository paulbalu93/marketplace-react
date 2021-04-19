import React from "react";
import { Col, Card, Button } from "react-bootstrap";

function SingleProduct(props) {
  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          style={{ width: "100px" }}
          src={props.product.imageUrl}
        />
        <Card.Body>
          <Card.Title>{props.product.name}</Card.Title>
          <Card.Text>
            <p>Brand: {props.product.brand}</p>
            <p>{props.product.price}</p>
          </Card.Text>
          <Button variant={props.isInCart ? "danger" : "primary"} {...props}>
            {props.isInCart ? "Delete" : "Add to cart"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SingleProduct;
