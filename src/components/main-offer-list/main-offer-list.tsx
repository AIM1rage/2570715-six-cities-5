import SortOptions from '@/components/sort-options/sort-options.tsx';
import OfferList from '@/components/offer-list/offer-list.tsx';
import {getOfferCompare} from '@/utils/utils.ts';
import Map from '@/components/map/map.tsx';
import {City, Offer} from '@/types/api.ts';
import {SortOption} from '@/types/sort-option.ts';

interface MainOfferListProps {
  city: City;
  selectedOffer: Offer | undefined;
  offers: Offer[];
  sortOption: SortOption;
}

export default function MainOfferList({city, selectedOffer, offers, sortOption}: MainOfferListProps) {
  const cityOffers = offers.filter((offer) => offer.city.name === city.name);
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityOffers.length} places to stay in {city.name}</b>
        <SortOptions/>
        <div className="cities__places-list places__list tabs__content">
          <OfferList offers={cityOffers.toSorted(getOfferCompare(sortOption))} page={'cities'}/>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map location={city.location} offers={cityOffers} selectedOffer={selectedOffer}/>
        </section>
      </div>
    </div>);
}
