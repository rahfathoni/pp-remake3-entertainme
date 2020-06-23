import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useHistory } from 'react-router-dom'

const GET_TVSERIES = gql`
    {
          tvSeries {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
    }
`;

const ADD_TVSERIES = gql`
    mutation($tvSeriesData: inputTvSeries) {
        addTvSeries(tvSeriesData: $tvSeriesData) {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
    }
`;

const TvSeriesForm = () => {
    const [inputTvSeries, setInputTvSeries] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: 0,
        tags: ['tv-series']
    })
    const history = useHistory()

    const [addTvSeries] = useMutation(ADD_TVSERIES, {
        update(cache, { data: { addTvSeries } }) {
            // console.log('masukkkkkkkkkk') ////
            const { tvSeries } = cache.readQuery({ query: GET_TVSERIES })
            // console.log(tvSeries) ///
            cache.writeQuery({
                query: GET_TVSERIES,
                data: { tvSeries: tvSeries.concat([addTvSeries]) }
            })
        }
    })

    const tagValue = [
        'animation', 'family', 'drama', 'action', 'comedy', 'romance', 'horror'
        , 'thriller', 'sci-fiction', 'documentary', 'biography', 'adult', 'sport'
    ]

    function inputChange(event){
        let {name, value, checked} = event.target
        if(name === 'popularity'){
            value = Number(value)
        }
        let tagCheck = inputTvSeries.tags
        if(name === 'tags'){
            if (checked){
                tagCheck.push(value)
                value = tagCheck
            }
            else {
                let index = tagCheck.indexOf(value)
                tagCheck.splice(index, 1)
                value = tagCheck
            }
        }
        const NewInputTvSeries = {
            ...inputTvSeries,
            [name]: value
        }
        setInputTvSeries(NewInputTvSeries)
    }

    function submitTvSeries(event){
        event.preventDefault()
        addTvSeries({ variables: {
            tvSeriesData: {
                title: inputTvSeries.title,
                overview: inputTvSeries.overview,
                poster_path: inputTvSeries.poster_path,
                popularity: inputTvSeries.popularity,
                tags: inputTvSeries.tags
            }
        }})
        // console.log(inputTvSeries) 
        setInputTvSeries({
            title: '',
            overview: '',
            poster_path: '',
            popularity: 0,
            tags: ['tv-series']
        })
        history.push('/')
    }

    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <h5 className="text-left" >ADD NEW TV SERIES</h5>
                    <h2 className="text-center" >LET'S MAKE OUR DATABASE BIGGER!!</h2>
                    <hr style={{
                            color: 'white',
                            backgroundColor: 'white',
                            height: 2
                        }}
                    />
                    <Form onSubmit={submitTvSeries}>
                        <Form.Group>
                            <Form.Label><strong>Title</strong></Form.Label>
                            <Form.Control type="text" placeholder="Tv Series Title..." 
                            onChange={inputChange} name="title" vilue={inputTvSeries.title} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><strong>Overview</strong></Form.Label>
                            <Form.Control as='textarea' row='3' placeholder="Tv Series Overview..." 
                            onChange={inputChange} name="overview" value={inputTvSeries.overview} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><strong>Poster URL</strong></Form.Label>
                            <Form.Control type="text" placeholder="poster url..." 
                            onChange={inputChange} name="poster_path" value={inputTvSeries.poster_path} required/>
                        </Form.Group>
                        <div className="text-center">
                            <Image style={{height: '450px'}} className="border border-white" src={inputTvSeries.poster_path} alt={inputTvSeries.poster_path} fluid rounded/>
                        </div>
                        <Form.Group>
                            <Form.Label><strong>Popularity (from 0.1 to 10.0)</strong></Form.Label>
                            <Form.Control type="number" step="0.1" min="0.1" max="10"
                            onChange={inputChange} name="popularity" value={inputTvSeries.popularity} required/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Tags</Form.Label><br />
                            {tagValue.map((tag, i) => {
                                return <Form.Check type="checkbox" key={i} onChange={inputChange}
                                    value={tag} name="tags" inline label={tag} />
                            })}
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant='success' type="submit">
                                SUBMIT NEW TV SERIES
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TvSeriesForm;
