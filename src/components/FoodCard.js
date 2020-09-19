import React from 'react'
import { Card, CardImg } from 'react-bootstrap'

const NOT_AVAIALABLE = '../assets/not_available';

const FoodCard = ({handleShowConfirmation, setItemIdToConfirm, listing}) => {
    const {
        description = 'Not Available',
        id=null,
        name='Not Available',
        imageUrl=NOT_AVAIALABLE} = listing   

    const showConfirmation = (id) => {
        handleShowConfirmation();
        setItemIdToConfirm(id);
    }

    return (
            <Card style={{ width: '18rem' }} onClick={() => showConfirmation(id)}>
                <CardImg style={{height:"300px", width: "17.9rem"}}src={imageUrl}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
    )
}

export default FoodCard