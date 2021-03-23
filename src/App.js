import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import AppBar from './components/AppBar';

const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./components/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<h1>Загружаем...</h1>}>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route exact path={routes.movies} component={MoviesPage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </>
);
export default App;
