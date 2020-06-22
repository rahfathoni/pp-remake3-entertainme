import React from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import AllData from '../components/AllData'
import MovieData from '../components/MovieData'
import TvSeriesData from '../components/TvSeriesData'

const Home = () => {
    
    return (
        <Container className='my-3'>
            <Row>
                <Col>
                    <Tabs variant="tabs" defaultActiveKey="all">
                        <Tab eventKey="all" title="All">
                            <AllData />
                            <hr />
                        </Tab>
                        <Tab eventKey="movie" title="Movie">
                            <MovieData />
                            <hr />
                        </Tab>
                        <Tab eventKey="tvSeries" title="tvSeries">
                            <TvSeriesData />
                            <hr />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
