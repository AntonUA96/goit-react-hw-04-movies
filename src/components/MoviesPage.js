import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moviesApi from '../movies-api';
import styles from '../App.module.css';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };
  componentDidMount() {
    const { location } = this.props;
    if (location.search) {
      const qwe = new URLSearchParams(this.props.location.search).get('query');
      moviesApi
        .searchMovies(qwe)
        .then(resp => this.setState({ movies: resp.data.results }));
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${qwe}`,
      });
    }
  }
  fetchFilms() {
    const qwe = this.state.query;
    // const { location } = this.props;
    moviesApi.searchMovies(qwe).then(resp => {
      // console.log(resp.data.results);
      this.setState({ movies: resp.data.results });
      // console.log(this.state.movies);
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${qwe}`,
      });
      // console.log(this.props.history.location.search);
    });
  }
  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ query: '' });
    this.fetchFilms();
  };
  render() {
    // console.log(this.state.query);
    const { movies } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.MoviesPage}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search film"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
        {movies && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: location,
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
export default withRouter(MoviesPage);
