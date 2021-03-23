import React, { Component } from 'react';
import moviesApi from '../movies-api';
import styles from '../App.module.css';

class Reviews extends Component {
  state = {
    reviews: [],
  };
  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    moviesApi.getMovieReviews(movieId).then(resp => {
      // console.log(resp.data.results)
      this.setState({ reviews: resp.data.results });
      // console.log(this.state.reviews);
    });
  }
  render() {
    const { reviews } = this.state;
    return (
      <div>
        {reviews.length === 0 && <p>We dont have any reviews for this film.</p>}
        {reviews.length !== 0 && (
          <ul className={styles.Reviews}>
            {reviews.map(e => (
              <li key={e.id}>
                <p>Author: {e.author}</p>
                <p>{e.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
export default Reviews;
