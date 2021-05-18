import React from "react"
import { Container } from "react-bootstrap"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import { Route } from "react-router"
import HomeScreen from "./components/screens/HomeScreen"
import ProductDetailsScreen from "./components/screens/ProductDetailsScreen"
import CartScreen from "./components/screens/CartScreen"
import UserLoginScreen from "./components/screens/UserLoginScreen"
import RegisterScreen from "./components/screens/RegisterScreen"
import { useSelector } from "react-redux"
import ProfileScreen from "./components/screens/ProfileScreen"
import ShippingScreen from "./components/screens/ShippingScreen"
import PaymentScreen from "./components/screens/PaymentScreen"
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen"
export default function App() {
  let user = useSelector((state) => state.userLogin)
  let { userInfo } = user
  return (
    <>
      <Header />
      <Container>
        <main className="py-3">
          <Route path="/placeOrder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/login" component={UserLoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/" component={HomeScreen} exact />
          {userInfo && <Route path="/cart/:id?" component={CartScreen} />}
          <Route path="/product/:id" component={ProductDetailsScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </main>
      </Container>
      <Footer />
    </>
  )
}
