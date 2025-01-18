import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants/app-routes.ts';
import {memo} from 'react';

function NavigationBarNotLogged() {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>);
}

const MemoizedNavigationBarNotLogged = memo(NavigationBarNotLogged);
export default MemoizedNavigationBarNotLogged;
