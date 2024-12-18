import {useParams} from 'react-router-dom';
import NotFoundScreen from '@/pages/not-found-screen/not-found-screen.tsx';
import Header from '@/components/header/header.tsx';
import {offers} from '@/mocks/offers.ts';
import OfferList from '@/components/offer-list/offer-list.tsx';
import ReviewList from '@/components/review-list/review-list.tsx';
import {comments} from '@/mocks/comments.ts';
import Map from '@/components/map/map.tsx';
import {useState} from 'react';
import {Offer} from '@/api/types.ts';

export default function OfferScreen(): JSX.Element {
  const params = useParams();
  const foundOffer = offers.find((offer) => offer.id === params.id);
  const otherOffers = offers.filter((offer) => offer.id !== params.id);
  const [selectedOtherOffer, setSelectedOtherOffer] = useState<Offer | undefined>(undefined);
  if (!foundOffer) {
    return <NotFoundScreen/>;
  }
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/room.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-02.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-03.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/studio-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {foundOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {foundOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button ${foundOffer.isFavorite && 'offer__bookmark-button--active'} button`}
                  type="button"
                  style={{top: foundOffer.isPremium ? 41 : 4}}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${foundOffer.rating * 100 / 5}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{foundOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {foundOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {foundOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {foundOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{foundOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">Whats inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {foundOffer.description}
                  </p>
                </div>
              </div>
              <ReviewList comments={comments}/>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={otherOffers[0].city} offers={otherOffers} selectedOffer={undefined}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OfferList offers={otherOffers}
                selectedOffer={selectedOtherOffer}
                setSelectedOffer={setSelectedOtherOffer}
                page={'near-places'}
                width={260}
                height={200}
              />
            </div>
          </section>
        </div>
      </main>
    </div>);
}
