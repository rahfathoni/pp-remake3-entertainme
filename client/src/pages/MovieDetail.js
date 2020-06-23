import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs, Form, Button, Image } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LoadingSpinner from '../components/LoadingSpinner'
import Detail from '../components/Detail'

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

const UPDATE_MOVIE = gql`
    mutation($movieId: ID!, $movieData: inputMovies) {
        updateMovie(movieId: $movieId, movieData: $movieData){
            message
        }
    }
`;

const DELETE_MOVIE = gql`
    mutation($movieId: ID!) {
        deleteMovie(movieId: $movieId){
            message
        }
    }
`;

const MovieDetail = () => {
    const { movieId } = useParams();
    const history = useHistory();

    const GET_MOVIE_BY_ID = gql`
        {
            movieById(
                movieId: "${movieId}"
            ) {
                _id,
                title,
                overview,
                poster_path,
                popularity,
                tags
            }
        }
    `;
    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID)

    const [updateMovie] = useMutation(UPDATE_MOVIE, {
        update(cache){
            // console.log('updateeeee') /////////
            const { movieById } = cache.readQuery({ query: GET_MOVIE_BY_ID }) //just for __typename and _id
            // console.log(movieById) //////////
            cache.writeQuery({
                query: GET_MOVIE_BY_ID,
                data: { movieById: {
                    __typename: movieById.__typename,
                    _id: movieById._id,
                    title: update.title,
                    overview: update.overview,
                    poster_path: update.poster_path,
                    popularity: update.popularity,
                    tags: update.tags
                } }
            })
        }
    })

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        update(cache) {
            // console.log('deleteeeee')
            const { movies } = cache.readQuery({ query: GET_MOVIES })
            // console.log(movies)
            let indexDelete
            for (let i = 0; i < movies.length; i++){
                if(movies[i]._id === movieId){
                    indexDelete = i
                    movies.splice(indexDelete, 1)
                    break
                }
            }
            // console.log(indexDelete, 'i dari delete')
            // console.log(movies)
            cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: movies}
            })
        }
    })
    
    const [update, setUpdate] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: 0,
        tags: []
    })
    const [flag, setFlag] = useState(false)

    if(data && !flag){
        // console.log('masukkkkkkkk')
        // console.log(data.movieById)
        setUpdate({
            title: data.movieById.title,
            overview: data.movieById.overview,
            poster_path: data.movieById.poster_path,
            popularity: data.movieById.popularity,
            tags: data.movieById.tags
        })
        setFlag(true)
    }

    if(loading) return <LoadingSpinner />
    if(error) return <h1>ERROR {error.message}</h1>

    const tagValue = [
        'animation', 'family', 'drama', 'action', 'comedy', 'romance', 'horror'
        , 'thriller', 'sci-fiction', 'documentary', 'biography', 'adult', 'sport'
    ]

    function updateChange(event){
        let {name, value, checked} = event.target
        if(name === 'popularity'){
            value = Number(value)
        }
        let tagCheck = update.tags
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
        const NewUpdateMovie = {
            ...update,
            [name]: value
        }
        setUpdate(NewUpdateMovie)
    }

    function isChecked(tag) {
        if(data){
            for(let i = 0; i < data.movieById.tags.length; i++){
                if(data.movieById.tags[i] === tag){
                    return true
                }
            }
        }
    }

    function deleteThisMovie(event) {
        event.preventDefault()
        deleteMovie({ variables: {
            movieId: movieId
        }})
        setFlag(false)
        history.push('/')
    }

    function submitUpdateMovie(event) {
        event.preventDefault()
        // console.log(movieId) //////////
        updateMovie({ variables: {
            movieId: movieId,
            movieData : {
                title: update.title,
                overview: update.overview,
                poster_path: update.poster_path,
                popularity: update.popularity,
                tags: update.tags
            }
        } })
        // console.log(update)
    }
    // console.log('jalnnnnnnnnnnn')

    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <h2 className='text-center mb-3 text-uppercase'>{data.movieById.__typename}</h2>
                    <Tabs variant="tabs" defaultActiveKey="detail">
                        <Tab eventKey="detail" title="Detail">
                            <Detail data={data.movieById} />
                        </Tab>
                        <Tab eventKey="update" title="Update/Delete">
                            <Form onSubmit={submitUpdateMovie}>
                                <Form.Group>
                                    <Form.Label><strong>Title</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Movie Title..." 
                                    onChange={updateChange} name="title" value={update.title} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Overview</strong></Form.Label>
                                    <Form.Control as='textarea' row='3' placeholder="Movie Overview..." 
                                    onChange={updateChange} name="overview" value={update.overview} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Poster URL</strong></Form.Label>
                                    <Form.Control type="text" placeholder="poster url..." 
                                    onChange={updateChange} name="poster_path" value={update.poster_path} required/>
                                </Form.Group>
                                <div className="text-center">
                                    <Image style={{height: '450px'}} className="border border-white" src={update.poster_path} alt={update.poster_path} fluid rounded/>
                                </div>
                                <Form.Group>
                                    <Form.Label><strong>Popularity (from 0.1 to 10.0)</strong></Form.Label>
                                    <Form.Control type="number" step="0.1" min="0.1" max="10"
                                    onChange={updateChange} name="popularity" value={update.popularity} required/>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Tags</Form.Label><br />
                                    {tagValue.map((tag, i) => {
                                        return <Form.Check type="checkbox" key={i} onChange={updateChange}
                                            value={tag} name="tags" inline 
                                            label={tag} defaultChecked={isChecked(tag)}
                                            />
                                    })}
                                </Form.Group>
                                <div className='text-center'>
                                    <Row>
                                        <Col>
                                            <Button variant='secondary' type="submit">
                                                UPDATE
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant='danger' type="button" onClick={deleteThisMovie}>
                                                DELETE
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieDetail;
