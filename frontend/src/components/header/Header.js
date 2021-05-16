import React from "react"
import { NavLink, Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../redux"
export default function Header() {
  let state = useSelector((state) => state.cart)
  let user = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()
  let { userInfo } = user
  let { cartItems } = state
  let countItem = cartItems.reduce((curr, acount) => {
    return (curr += acount.qty)
  }, 0)
  let handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart {userInfo ? countItem : ""}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to={`/profile`}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>{" "}
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
