import React, {useState, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap'
import { getOrderHistory } from '../firebase'
import OrderTable from '../components/OrderTable'

const OrderHistory = () => {
    let [ orderHistory, setOrderHistory ] = useState(null)

    useEffect(() => {
        getOrderHistory(localStorage.getItem("uid"), setOrderHistory).then(listing => {
            setOrderHistory(listing)
        })
    }, []);

    //Convert order history to table
    let contents = orderHistory === null ? <div>Retrieving Order History</div> 
        : orderHistory === [] ? <div>You have no order history</div>
        : orderHistory.map(order => {
            // console.log(order)
            return (
                <OrderTable order={order}/>
            )
        })

    return (
        <Table>
            {/* <Button onClick={() => getOrderHistory(localStorage.getItem("uid"), setOrderHistory)}>get orders</Button> */}
            <div className="d-flex justify-content-start"><h4>Your Orders</h4></div>
            {contents}
        </Table>
    )
}

export default OrderHistory