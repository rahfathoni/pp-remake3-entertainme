import React from 'react';
import { Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LoadingSpinner from './LoadingSpinner'
import ShowCard from './ShowCard'

const GET_MOVIES = gql`
    {
        movies {
            _id,
            title,
            overview
            poster_path,
            popularity,
            tags
        }
    }
`;

const MovieData = () => {
    const { loading, error, data } = useQuery(GET_MOVIES)

    if(loading) return <LoadingSpinner />
    if(error) return <h1>ERROR {error.message}</h1>

    return (
        <Container>
            <Row>
                {data.movies.map((movie, i) => {
                    return <ShowCard data={movie} navigation={`/detail/movies/${movie._id}`} key={i} />
                })}
            </Row>
        </Container>
    );
}

export default MovieData;
