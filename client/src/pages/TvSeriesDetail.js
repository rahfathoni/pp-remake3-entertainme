import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs, Form, Button, Image } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LoadingSpinner from '../components/LoadingSpinner'
import Detail from '../components/Detail'

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

const UPDATE_TVSERIES = gql`
    mutation($tvSeriesId: ID!, $tvSeriesData: inputTvSeries) {
        updateTvSeries(tvSeriesId: $tvSeriesId, tvSeriesData: $tvSeriesData){
            message
        }
    }
`;

const DELETE_TVSERIES = gql`
    mutation($tvSeriesId: ID!) {
        deleteTvSeries(tvSeriesId: $tvSeriesId){
            message
        }
    }
`;

const TvSeriesDetail = () => {
    const { tvSeriesId } = useParams();
    const history = useHistory();

    const GET_TVSERIES_BY_ID = gql`
        {
            tvSeriesById(
                tvSeriesId: "${tvSeriesId}"
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
    const { loading, error, data } = useQuery(GET_TVSERIES_BY_ID)

    const [updateTvSeries] = useMutation(UPDATE_TVSERIES, {
        update(cache){
            // console.log('updateeeee') /////////
            const { tvSeriesById } = cache.readQuery({ query: GET_TVSERIES_BY_ID }) //just for __typename and _id
            // console.log(tvSeriesById) //////////
            cache.writeQuery({
                query: GET_TVSERIES_BY_ID,
                data: { tvSeriesById: {
                    __typename: tvSeriesById.__typename,
                    _id: tvSeriesById._id,
                    title: update.title,
                    overview: update.overview,
                    poster_path: update.poster_path,
                    popularity: update.popularity,
                    tags: update.tags
                } }
            })
        }
    })

    const [deleteTvSeries] = useMutation(DELETE_TVSERIES, {
        update(cache) {
            // console.log('deleteeeee') /////
            const { tvSeries } = cache.readQuery({ query: GET_TVSERIES })
            // console.log(tvSeries) /////
            let indexDelete
            for (let i = 0; i < tvSeries.length; i++){
                if(tvSeries[i]._id === tvSeriesId){
                    indexDelete = i
                    tvSeries.splice(indexDelete, 1)
                    break
                }
            }
            // console.log(indexDelete, 'i dari delete') ////
            // console.log(tvSeries) ////
            cache.writeQuery({
                query: GET_TVSERIES,
                data: { tvSeries: tvSeries}
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
        // console.log(data.tvSeriesById)
        setUpdate({
            title: data.tvSeriesById.title,
            overview: data.tvSeriesById.overview,
            poster_path: data.tvSeriesById.poster_path,
            popularity: data.tvSeriesById.popularity,
            tags: data.tvSeriesById.tags
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
        const NewUpdateTvSeries = {
            ...update,
            [name]: value
        }
        setUpdate(NewUpdateTvSeries)
    }

    function isChecked(tag) {
        if(data){
            for(let i = 0; i < data.tvSeriesById.tags.length; i++){
                if(data.tvSeriesById.tags[i] === tag){
                    return true
                }
            }
        }
    }

    function deleteThisTvSeries(event) {
        event.preventDefault()
        deleteTvSeries({ variables: {
            tvSeriesId: tvSeriesId
        }})
        setFlag(false)
        history.push('/')
    }

    function submitUpdateTvSeries(event) {
        event.preventDefault()
        // console.log(tvSeriesId) //////////
        updateTvSeries({ variables: {
            tvSeriesId: tvSeriesId,
            tvSeriesData : {
                title: update.title,
                overview: update.overview,
                poster_path: update.poster_path,
                popularity: update.popularity,
                tags: update.tags
            }
        } })
        // console.log(update)
    }

    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <h2 className='text-center mb-3 text-uppercase'>{data.tvSeriesById.__typename}</h2>
                    <Tabs variant="tabs" defaultActiveKey="detail">
                        <Tab eventKey="detail" title="Detail">
                            <Detail data={data.tvSeriesById} />
                        </Tab>
                        <Tab eventKey="update" title="Update/Delete">
                            <Form onSubmit={submitUpdateTvSeries}>
                                <Form.Group>
                                    <Form.Label><strong>Title</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Tv Series Title..." 
                                    onChange={updateChange} name="title" value={update.title} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Overview</strong></Form.Label>
                                    <Form.Control as='textarea' row='3' placeholder="Tv Series Overview..." 
                                    onChange={updateChange} name="overview" value={update.overview} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Poster URL</strong></Form.Label>
                                    <Form.Control type="text" placeholder="poster url..." 
                                    onChange={updateChange} name="poster_path" value={update.poster_path} required/>
                                </Form.Group>
                                <div className="text-center">
                                    <Image style={{height: '450px'}}  className="border border-white" src={update.poster_path} alt={update.poster_path} fluid rounded/>
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
                                            <Button variant='danger' type="button" onClick={deleteThisTvSeries}>
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

export default TvSeriesDetail;
