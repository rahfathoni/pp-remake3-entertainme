import React from 'react';
import { Card, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ShowCard = (props) => {
    const data = props.data
    const navigation = props.navigation

    return (
        <Col md={4} className='mt-2 mb-3'>
            <Card bg='light' text='dark' border='secondary'
            as={Link} to={navigation}
            >
                <Card.Img variant="top" src={data.poster_path} alt={data.poster_path} style={{height: '400px'}} />
                <Card.Body>
                    <Card.Title className='my-0 text-center'><strong>{data.title}</strong></Card.Title>
                    <Card.Text className='my-1 text-left'>
                        {data.tags.map((tag) => {
                            return <span key={tag}>
                                <Button className='my-1' variant="outline-dark" size="sm" disabled >
                                    {tag}
                                </Button>{' '}
                            </span>
                        })}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ShowCard;
