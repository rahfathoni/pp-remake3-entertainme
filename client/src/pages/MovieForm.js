import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useHistory } from 'react-router-dom'

const GET_MOVIES = gql`
    {
        movies {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
    }
`;

const ADD_MOVIES = gql`
    mutation($movieData: inputMovies) {
        addMovie(movieData: $movieData) {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
    }
`;

const MovieForm = () => {
    const [inputMovie, setInputMovie] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: 0,
        tags: ['movie']
    })
    const history = useHistory()

    const [addMovie] = useMutation(ADD_MOVIES, {
        update(cache, { data: { addMovie } }) {
            // console.log('masukkkkkkkkkk') ////
            const { movies } = cache.readQuery({ query: GET_MOVIES })
            // console.log(movies) ///
            cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: movies.concat([addMovie]) }
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
        let tagCheck = inputMovie.tags
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
        const NewInputMovie = {
            ...inputMovie,
            [name]: value
        }
        setInputMovie(NewInputMovie)
    }

    function submitMovie(event){
        event.preventDefault();
        addMovie({ variables: {
            movieData: {
                title: inputMovie.title,
                overview: inputMovie.overview,
                poster_path: inputMovie.poster_path,
                popularity: inputMovie.popularity,
                tags: inputMovie.tags
            }
        }})
        // console.log(inputMovie) ///
        setInputMovie({
            title: '',
            overview: '',
            poster_path: '',
            popularity: 0,
            tags: ['movie']
        })
        history.push('/')
    }

    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <h5 className="text-left" >ADD NEW MOVIE</h5>
                    <h2 className="text-center" >LET'S MAKE OUR DATABASE BIGGER!!</h2>
                    <hr style={{
                            color: 'white',
                            backgroundColor: 'white',
                            height: 2
                        }}
                    />
                    <Form onSubmit={submitMovie}>
                        <Form.Group>
                            <Form.Label><strong>Title</strong></Form.Label>
                            <Form.Control type="text" placeholder="Movie Title..." 
                            onChange={inputChange} name="title" value={inputMovie.title} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><strong>Overview</strong></Form.Label>
                            <Form.Control as='textarea' row='3' placeholder="Movie Overview..." 
                            onChange={inputChange} name="overview" value={inputMovie.overview} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><strong>Poster URL</strong></Form.Label>
                            <Form.Control type="text" placeholder="poster url..." 
                            onChange={inputChange} name="poster_path" value={inputMovie.poster_path} required/>
                        </Form.Group>
                        <div className="text-center">
                            <Image style={{height: '450px'}} className="border border-white" src={inputMovie.poster_path} alt={inputMovie.poster_path} fluid rounded/>
                        </div>
                        <Form.Group>
                            <Form.Label><strong>Popularity (from 0.1 to 10.0)</strong></Form.Label>
                            <Form.Control type="number" step="0.1" min="0.1" max="10"
                            onChange={inputChange} name="popularity" value={inputMovie.popularity} required/>
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
                                SUBMIT NEW MOVIE
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieForm;
