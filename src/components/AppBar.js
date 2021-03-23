import { NavLink } from 'react-router-dom';
import routes from '../routes';
import styles from '../App.module.css';
const AppBar = () => {
  return (
    <ul className={styles.Navigation}>
      <li>
        <NavLink
          exact
          className={styles.NavigationLink}
          activeClassName={styles.NavigationLinkActive}
          to={routes.home}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={styles.NavigationLink}
          activeClassName={styles.NavigationLinkActive}
          to={routes.movies}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};
export default AppBar;
