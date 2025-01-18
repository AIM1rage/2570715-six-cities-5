import Logo from '@/components/logo/logo.tsx';
import NavigationBar from '@/components/navigation-bar/navigation-bar.tsx';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import NavigationBarNotLogged from '@/components/navigation-bar-not-logged/navigation-bar-not-logged.tsx';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {memo} from 'react';
import {getAuthorizationStatus, getAvatarUrl, getEmail} from '@/store/app-user/selectors.ts';
import {getFavoriteOffers} from '@/store/favorite-offers/selectors.ts';

function Header() {
  const avatarUrl = useAppSelector(getAvatarUrl);
  const email = useAppSelector(getEmail);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorized = authorizationStatus === AuthorizationStatus.Auth;
  const favoriteOffersCount = useAppSelector(getFavoriteOffers).filter((offer) => offer.isFavorite).length;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          {authorized
            ? <NavigationBar avatarUrl={avatarUrl!} email={email!} favoriteOffersCount={favoriteOffersCount}/>
            : <NavigationBarNotLogged/>}
        </div>
      </div>
    </header>);
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
