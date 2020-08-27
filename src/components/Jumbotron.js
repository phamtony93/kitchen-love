import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
// import bgImage from '../bg_1.jpg'

const Jumbotron = () => {
    return (
        <Jumbo>
            <div className="overlay"></div>
            <Container><h1>Welcome to Kitchen Love</h1></Container>
        </Jumbo>
    )
}

export default Jumbotron