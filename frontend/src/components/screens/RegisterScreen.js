import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import FormContainer from "../utilite/FormContainer"
import { registerUser } from "../../redux"
import Loader from "../utilite/Loader"
import Message from "../utilite/Message"
export default function RegisterScreen(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  let [message, setMessage] = useState("")
  let handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setState({ ...state, [name]: value })
  }
  let user = useSelector((state) => state.register)
  let { userInfo, loading, error } = user
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.password !== state.confirmPassword) {
      setMessage("try again")
    }
    dispatch(registerUser(state.name, state.email, state.password))
  }

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, userInfo, redirect])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Register</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" value={state.name} name="name" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={state.email} name="email" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={state.password} name="password" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>ConfiremPassword</Form.Label>
              <Form.Control type="password" placeholder="Enter Confirempassword" value={state.confirmPassword} name="confirmPassword" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Have orady account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  )
}
