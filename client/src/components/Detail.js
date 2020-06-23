import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'

const Detail = (props) => {
    const data = props.data

    return (
        <Container className='my-2'>
            <Row>
                <Col>
                    <div className='text-center mb-1'>
                        <Image style={{height: '450px'}} className="border border-white" src={data.poster_path} alt={`image Error ${data.poster_path}`} rounded />
                    </div>
                    <h3 className='mb-1 text-center'>{data.title}</h3>
                    <p><strong>Popularity :</strong> {data.popularity} </p>
                    <p><strong>Overview :</strong> {data.overview} </p>
                    <p className='mb-0'><strong>Tags :</strong></p>
                    <ul>
                        {data.tags.map((tag) => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Detail;
