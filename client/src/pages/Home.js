import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import AllData from '../components/AllData'

const Home = () => {
    
    return (
        <Container>
            <Row>
                <Col>
                    <AllData />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
