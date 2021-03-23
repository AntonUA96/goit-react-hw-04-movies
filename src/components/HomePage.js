import React, { Component } from 'react';
import moviesApi from '../movies-api';
import { NavLink } from 'react-router-dom';
import styles from '../App.module.css';
class HomePage extends Component {
  state = {
    trends: [],
  };
  componentDidMount() {
    moviesApi.getTrending().then(response => {
      //   console.log(response.data);
      this.setState({ trends: response.data.results });
    });
  }
  render() {
    const { trends } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.HomePage}>
        <h1>Trending today</h1>
        <ul>
          {trends.map(e => (
            <li key={e.id}>
              <NavLink
                to={{
                  pathname: `/movies/${e.id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                {' '}
                {e.title || e.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default HomePage;
