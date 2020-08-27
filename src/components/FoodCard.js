import React from 'react'
import { Card, CardImg } from 'react-bootstrap'


const NOT_AVAIALABLE = '../assets/not_available';

const FoodCard = ({
    description='Not Available',
    price=0,
    name='Not Available',
    imageUrl=NOT_AVAIALABLE
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <CardImg style={{height:"300px", width: "18rem"}}src={imageUrl}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default FoodCard