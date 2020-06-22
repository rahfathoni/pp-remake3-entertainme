import React from 'react';
import { Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LoadingSpinner from './LoadingSpinner'
import ShowCard from './ShowCard'

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

const TvSeriesData = () => {
    const { loading, error, data } = useQuery(GET_TVSERIES)

    if(loading) return <LoadingSpinner />
    if(error) return <h1>ERROR {error.message}</h1>

    return (
        <Container>
            <Row>
                {data.tvSeries.map((tv, i) => {
                    return <ShowCard data={tv} key={i} />
                })}
            </Row>
        </Container>
    );
}

export default TvSeriesData;
