import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserDetails, updateProfile } from "../../redux"
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import Loader from "../utilite/Loader"
import Message from "../utilite/Message"

export default function ProfileScreen(props) {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")
  let [message, setMessage] = useState("")
  let state = useSelector((state) => state.profile)
  let { user, loading, error } = state
  let userLogin = useSelector((state) => state.userLogin)
  let { userInfo } = userLogin
  let userProfile = useSelector((state) => state.userUpdateProfile)
  let { success } = userProfile
  const dispatch = useDispatch()
  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login")
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [props.history, dispatch, userInfo, user])

  let handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("try again")
    } else {
      dispatch(updateProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  )
}
