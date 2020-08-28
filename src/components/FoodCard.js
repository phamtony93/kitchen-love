import React from 'react'
import { Card, CardImg } from 'react-bootstrap'
// import ItemConfirmation from '../components/ItemConfirmation'

const NOT_AVAIALABLE = '../assets/not_available';



const FoodCard = (props) => {
    const {
        description = 'Not Available',
        id=null,
        name='Not Available',
        imageUrl=NOT_AVAIALABLE} = props.listing   

    const showConfirmation = (id) => {
        props.handleShowConfirmation();
        props.setItemIdToConfirm(id);
    }

    return (
        // <div onClick={() => console.log('hellow')}>
            <Card style={{ width: '18rem' }} onClick={() => showConfirmation(id)}>
                <CardImg style={{height:"300px", width: "17.9rem"}}src={imageUrl}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        // </div>

    )
}

export default FoodCard