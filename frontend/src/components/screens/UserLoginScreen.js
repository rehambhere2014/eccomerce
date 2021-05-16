import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Row, Col } from "react-bootstrap"
import { loginUser } from "../../redux"
import FormContainer from "../utilite/FormContainer"
export default function UserLoginScreen(props) {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let state = useSelector((state) => state.userLogin)
  let { userInfo } = state

  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      props.history.push("/")
    }
  }, [dispatch, userInfo])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}
