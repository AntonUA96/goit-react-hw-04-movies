import React, { Component } from 'react';
import moviesApi from '../movies-api';
import styles from '../App.module.css';
class Cast extends Component {
  state = {
    cast: [],
  };
  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    moviesApi.getMovieCast(movieId).then(resp => {
      //   console.log(resp.data.cast);
      this.setState({ cast: resp.data.cast });
      //   console.log(this.state.cast);
    });
  }
  render() {
    const { cast } = this.state;
    // console.log(cast);
    return (
      <ul>
        {cast.map(e => (
          <li key={e.id}>
            <img
              className={styles.CastFoto}
              src={`https://image.tmdb.org/t/p/w500${e.profile_path}`}
              alt={e.original_title}
            />
            <p>{e.name}</p>
            <p>Character: {e.character}</p>
          </li>
        ))}
      </ul>
    );
  }
}
export default Cast;
