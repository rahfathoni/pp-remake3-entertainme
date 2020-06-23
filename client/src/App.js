import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks'
import client from './config/graphql'
import Home from './pages/Home'
import MovieForm from './pages/MovieForm'
import TvSeriesForm from './pages/TvSeriesForm'
import NavigationBar from './components/NavigationBar'
import MovieDetail from './pages/MovieDetail'
import TvSeriesDetail from './pages/TvSeriesDetail'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/addMovie'>
            <MovieForm />
          </Route>
          <Route path='/addTvSeries'>
            <TvSeriesForm />
          </Route>
          <Route path='/detail/movies/:movieId'>
            <MovieDetail />
          </Route>
          <Route path='/detail/tvSeries/:tvSeriesId'>
            <TvSeriesDetail />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
