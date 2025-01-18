import {useNavigate, useParams} from 'react-router-dom';
import NotFoundScreen from '@/pages/not-found-screen/not-found-screen.tsx';
import Header from '@/components/header/header.tsx';
import Map from '@/components/map/map.tsx';
import NearbyOfferList from '@/components/nearby-offer-list/nearby-offer-list.tsx';
import {useEffect} from 'react';
import {
  fetchOfferAction,
  postSwitchFavoriteStatus
} from '@/store/api-actions.ts';
import Spinner from '@/components/spinner/spinner.tsx';
import OfferImage from '@/components/offer-image/offer-image.tsx';
import {capitalize} from '@/utils/utils.ts';
import {useAppDispatch} from '@/hooks/use-app-dispatch.tsx';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import ReviewSection from '@/components/review-section/review-section.tsx';
import {MAX_OFFER_IMAGES_COUNT} from '@/constants/settings.ts';
import {getChosenOffer} from '@/store/chosen-offer/selectors.ts';
import {getAuthorizationStatus} from '@/store/app-user/selectors.ts';
import {AppRoute} from '@/constants/app-routes.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';

export default function OfferScreen(): JSX.Element {
  const {id} = useParams();

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const {offer, nearbyOffers, comments, isLoading, notFound} = useAppSelector(getChosenOffer);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction({offerId: id}));
    }
  }, [dispatch, id]);

  const handleSwitchFavoriteStatus = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(postSwitchFavoriteStatus(offer!));
  };

  if (notFound) {
    return <NotFoundScreen/>;
  }

  return (
    <div className="page">
      <Header/>
      {isLoading || !offer ? <Spinner/> :
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.slice(0, MAX_OFFER_IMAGES_COUNT).map((image) =>
                  <OfferImage key={offer.id + image} src={image}/>)}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button
                    onClick={handleSwitchFavoriteStatus}
                    className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
                    type="button"
                    style={{top: offer.isPremium ? 41 : 4}}
                  >
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${Math.round(offer.rating) * 100 / 5}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {capitalize(offer.type)}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} {`Bedroom${offer.bedrooms > 1 ? 's' : ''}`}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} {`adult${offer.maxAdults > 1 ? 's' : ''}`}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">Whats inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) =>
                      <li className={'offer__inside-item'} key={offer.id + good}>{good}</li>)}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div
                      className={`offer__avatar-wrapper user__avatar-wrapper ${(offer.host.isPro && 'offer__avatar-wrapper--pro')}`}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <ReviewSection comments={comments}/>
              </div>
            </div>
            <section className="offer__map map">
              <Map location={offer.city.location} offers={nearbyOffers.concat(offer)}
                selectedOffer={offer}
              />
            </section>
          </section>
          <NearbyOfferList nearbyOffers={nearbyOffers}/>
        </main>}
    </div>);
}
