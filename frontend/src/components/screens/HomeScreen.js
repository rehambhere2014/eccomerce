import React, { useState, useEffect } from "react"
import axios from "axios"
import { Col, Row } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Products from "../product/Products"
import Message from "../utilite/Message"
import { fetchProducts } from "../../redux"
import Loader from "../utilite/Loader"
export default function HomeScreen() {
  let state = useSelector((state) => state.productsList)
  let { loading, products, error } = state

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products {...product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}
