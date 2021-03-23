import React, { Component } from 'react';
import styles from '../App.module.css';
import moviesApi from '../movies-api';
import { NavLink, Route, Switch } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';
import routes from '../routes';

class MovieDetailsPage extends Component {
  state = {
    movie: {
      genres: [],
    },
    // movie: [],
  };
  // componentDidMount() {
  //   moviesApi.getMovieDetails().then(resp => console.log(resp));
  // }
  componentDidMount() {
    this.getMovieDetails();
  }
  getMovieDetails = () => {
    const { match } = this.props;
    const { movieId } = match.params;
    // console.log(movieId);
    moviesApi.getMovieDetails(movieId).then(r => {
      this.setState({ movie: r.data });
      // console.log(this.state.movie.backdrop_path);
    });
  };
  hendleGoBack = () => {
    const { location, history } = this.props;
    history.push(location.state.from);
  };
  // hendleGoBack = () => {
  //   const { location, history } = this.props;
  //   history.goBack();
  // }
  // console.log(this.props);
  // console.log(this.props.history.location.search);
  // console.log(location);
  // console.log(history);
  // location.state ? history.push(location.state.prevPage) : history.goBack();
  // history.goBack();
  // if (location.state) {
  //   return history.push(location.state.from);
  // }
  // if (location.state) {
  //   return history.push(location.state.from);
  // }
  // history.push('/');
  render() {
    const { movie } = this.state;
    const { match, location } = this.props;
    // console.log(location)
    // console.log(match.url);
    // movie.genres.map(e => console.log(e));
    // console.log(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    return (
      <div className={styles.MovieDetailsPage}>
        <button
          className={styles.GoBackButton}
          type="button"
          onClick={this.hendleGoBack}
        >
          &#8592; Go back
        </button>
        <div className={styles.MovieCard}>
          <img
            className={styles.MovieImage}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <div className={styles.MovieDescription}>
            <h2>{movie.original_title}</h2>
            <p>User score: {movie.vote_average * 10}%</p>
            <div>
              <h3 className={styles.OverviewSpan}>Overview:</h3>
              {movie.overview}
            </div>
            <div className={styles.Genres}>
              <h3 className={styles.GenresSpan}>Genres:</h3>
              {movie.genres.map(e => (
                <p className={styles.GenresItem} key={e.id}>
                  {e.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.AdditorInform}>
          <p className={styles.AdditorSpan}>Additional information:</p>
          <p>
            <NavLink
              exact
              className={styles.NavigationLink}
              activeClassName={styles.NavigationLinkActive}
              to={{
                pathname: `${match.url}/cast`,
                state: {
                  from: location,
                },
              }}
              // to={`${match.url}/cast`}
            >
              Cast
            </NavLink>
          </p>
          <p>
            <NavLink
              exact
              className={styles.NavigationLink}
              activeClassName={styles.NavigationLinkActive}
              to={{
                pathname: `${match.url}/reviews`,
                state: {
                  from: location,
                },
              }}
            >
              Reviews
            </NavLink>
          </p>
        </div>
        <Switch>
          <Route path={routes.cast} component={Cast}></Route>
          <Route path={routes.reviews} component={Reviews}></Route>
        </Switch>
      </div>
    );
  }
}
export default MovieDetailsPage;
