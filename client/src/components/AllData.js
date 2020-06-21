import React from 'react';
import {} from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LoadingSpinner from './LoadingSpinner'

const GET_ALL_DATA = gql`
    {
        movies {
            _id,
            title,
            poster_path,
            popularity,
            tags
        }
          tvSeries {
            _id,
            title,
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
        <>
            <div className='mt-3 text-center'>
                <h5>All</h5>
                {data.movies.map((movie, i) => {
                    return <p key={i}>{i} {movie._id} - {movie.title} - {movie.poster_path} - {movie.popularity} - {movie.tags}</p>
                })}
                {data.tvSeries.map((tv, i) => {
                    return <p key={i}>{i} {tv._id} - {tv.title} - {tv.poster_path} - {tv.popularity} - {tv.tags}</p>
                })}
            </div>
        </>
    );
}

export default AllData;
