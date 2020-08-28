import React from 'react'
import { Table, Image, Button } from 'react-bootstrap'

const TAX_RATE = .0875;

const Cart = () => {

    const isEmptyCart = localStorage.getItem("cart") ? false : true

    //Use table for now, create custom component for better visuals
    const convertToTableRow = (cart) => {
        return cart.map(item => {
            return <tr>
                        <td><Image src={item.details.imageUrl} rounded style={{width:"30%", height: "auto"}}/></td>
                        <td>{item.details.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.quantity * item.details.price}</td>
                    </tr>
        })
    }

    const calculateSubtotal = (cart) => {
        return cart.reduce((total, item) => total += (item.quantity * item.details.price), 0)
    }

    const cart = !isEmptyCart ? JSON.parse(localStorage.getItem("cart")) : null
    const subTotal = !isEmptyCart ? calculateSubtotal(cart) : 0
    const taxes = subTotal * TAX_RATE
    const total = subTotal + taxes

    const displayEmpty = () => <div><h2>Your cart is empty. Add some food to your cart and stomache..</h2></div>
    const displayCart = () => {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Item</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    {convertToTableRow(cart)}
                </Table>
                <div className="justify-contents-end">
                    <h4>Subtotal {subTotal}</h4><br/>
                    <h4>Taxes {taxes}</h4><br/>
                    <h4>Total {total}</h4>

                </div>
                <Button>Confirm</Button>
            </div>

        )
    }

    return (
        isEmptyCart ? displayEmpty() : displayCart()
    )
}

export default Cart