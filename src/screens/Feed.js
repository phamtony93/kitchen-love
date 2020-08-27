import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { getListings } from '../firebase'
import FoodCard from '../components/FoodCard'

const Feed = () => {
    let [ listings, setListings ] = useState(null)
    // const foodList = getListings().then(listing => {
    //     setListings(listing)
    // })

    return (
        <Container>
            {listings 
            ? listings.map(listing => {
                return FoodCard(listing)})
            :     'Waiting'}
        </Container>
    )
}

export default Feed
