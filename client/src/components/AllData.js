import React from 'react';
import { Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LoadingSpinner from './LoadingSpinner'
import ShowCard from './ShowCard'

const GET_ALL_DATA = gql`
    {
        movies {
            _id,
            title,
            overview
            poster_path,
            popularity,
            tags
        }
        tvSeries {
            _id,
            title,
            overview
            poster_path,
            popularity,
            tags
        }
    }
`;

const AllData = () => {
    const { loading, error, data } = useQuery(GET_ALL_DATA)

    if(loading) return <LoadingSpinner />
    if(error) return <h1>ERROR {error.message}</h1>

    return (
        <Container>
            <Row>
                {data.movies.map((movie, i) => {
                    return <ShowCard data={movie} navigation={`/detail/movies/${movie._id}`} key={i} />
                })}
                {data.tvSeries.map((tv, i) => {
                    return <ShowCard data={tv} navigation={`/detail/tvSeries/${tv._id}`} key={i} />
                })}
            </Row>
        </Container>
    );
}

export default AllData;
