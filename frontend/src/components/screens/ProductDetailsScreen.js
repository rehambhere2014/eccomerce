import Axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Col, Row, Image, ListGroup, ListGroupItem, Button, Card, Form } from "react-bootstrap"
import Rating from "../rating/Rating"
import { useSelector, useDispatch } from "react-redux"
import { fetchProduct } from "../../redux"
import Loader from "../utilite/Loader"
import Message from "../utilite/Message"
export default function ProductDetailsScreen(props) {
  let state = useSelector((state) => state.productDetails)
  let user = useSelector((state) => state.userLogin)
  let { userInfo } = user
  let { product, loading, error } = state
  let [qta, setQta] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id))
  }, [dispatch, props.match])

  function addToCartHandler() {
    if (userInfo) {
      props.history.push(`/cart/${props.match.params.id}?qta=${qta}`)
    } else {
      alert("please login")
      props.history.push("/login")
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {" "}
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qta:</Col>
                        <Col>
                          <Form.Control as="select" value={qta} onChange={(e) => setQta(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((item) => {
                              return (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button className="btn-block" type="button" onClick={addToCartHandler} disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>{" "}
        </>
      )}
    </>
  )
}
