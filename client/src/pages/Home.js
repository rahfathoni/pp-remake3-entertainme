import React from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import AllData from '../components/AllData'
import MovieData from '../components/MovieData'
import TvSeriesData from '../components/TvSeriesData'

const Home = () => {
    
    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <Tabs variant="tabs" defaultActiveKey="all">
                        <Tab eventKey="all" title="All">
                            <AllData />
                            {/* <hr /> */}
                            <hr style={{
                                color: 'white',
                                backgroundColor: 'white',
                                height: 1
                                }}
                            />
                        </Tab>
                        <Tab eventKey="movie" title="Movie">
                            <MovieData />
                            {/* <hr /> */}
                            <hr style={{
                                color: 'white',
                                backgroundColor: 'white',
                                height: 1
                                }}
                            />
                        </Tab>
                        <Tab eventKey="tvSeries" title="Tv Series">
                            <TvSeriesData />
                            {/* <hr /> */}
                            <hr style={{
                                color: 'white',
                                backgroundColor: 'white',
                                height: 1
                                }}
                            />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
