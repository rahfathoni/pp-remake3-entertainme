import React from 'react';
import { Card, Col, Button } from 'react-bootstrap'

const ShowCard = (props) => {
    const data = props.data

    return (
        <Col md={4} className='mt-2 mb-3'>
            <Card bg='light' text='dark' border='secondary'>
                <Card.Img variant="top" src={data.poster_path} alt={data.poster_path} />
                <Card.Body>
                    <Card.Title className='my-0 text-center'><strong>{data.title}</strong></Card.Title>
                    <Card.Text className='my-1 text-left'>Popularity: {data.popularity}</Card.Text>
                    <Card.Text className='my-1 text-left'>
                        {data.tags.map((tag) => {
                            return <span key={tag}>
                                <Button variant="outline-dark" size="sm" disabled >
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
