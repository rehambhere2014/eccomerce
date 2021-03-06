import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeToCart } from "../../redux"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from "../utilite/Message"
export default function CartScreen(props) {
  console.log(props)
  let state = useSelector((state) => state.cart)
  let { cartItems } = state
  let qty = Number(props.location.search.split("=")[1])
  const dispatch = useDispatch()
  let productId = props.match.params.id
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, props.match, productId])

  function removeItem(id) {
    dispatch(removeToCart(id))
  }

  const checkoutHandler = () => {
    props.history.push("/shipping")
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              console.log("qty", item.qty)
              return (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to="/">{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      {
                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      }
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={() => removeItem(item.id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
