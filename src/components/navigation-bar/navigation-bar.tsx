import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants/app-routes.ts';
import {logoutAction} from '@/store/api-actions.ts';
import {Email, Url} from '@/types/api.ts';
import {useAppDispatch} from '@/hooks/use-app-dispatch.tsx';
import {memo} from 'react';

interface NavigationBarProps {
  avatarUrl: Url;
  email: Email;
  favoriteOffersCount: number;
}

function NavigationBar({avatarUrl, email, favoriteOffersCount}: NavigationBarProps) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img
                className="user__avatar"
                src={avatarUrl}
                width={54}
                height={54}
                alt="User avatar"
              />
            </div>
            <span className="header__user-name user__name">{email}</span>
            <span className="header__favorite-count">{favoriteOffersCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a
            className="header__nav-link"
            onClick={handleSignOut}
          >
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>);
}

const MemoizedNavigationBar = memo(NavigationBar);
export default MemoizedNavigationBar;
