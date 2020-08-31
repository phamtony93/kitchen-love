import React from 'react'
import { Table } from 'react-bootstrap'

const About = () => {
    return (
        // <div>We are on a mission to connect passionate chefs with hungry customers.</div>
        <Table>
            <theader>
                <tr>
                    <td>date</td>
                    <td>total</td>
                    <td>order id</td>
                    <td>ship to</td>
                </tr>
                <tr>
                    <td colSpan="3">item 1</td>
                </tr>
            </theader>
        </Table>
    )
}

export default About