import React, { useState } from "react"

import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { saveShipingAddress } from "../../redux"
import CheckoutSteps from "../utilite/CheckoutSteps"
import FormContainer from "../utilite/FormContainer"
export default function ShippingScreen({ history }) {
  let cart = useSelector((state) => state.cart)
  let { shippingAddress } = cart
  console.log(cart)
  let [address, setAddress] = useState(shippingAddress.address)
  let [city, setCity] = useState(shippingAddress.city)
  let [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  let [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  let submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShipingAddress({ address, city, postalCode, country }))
    history.push("/payment")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="Enter postal code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
