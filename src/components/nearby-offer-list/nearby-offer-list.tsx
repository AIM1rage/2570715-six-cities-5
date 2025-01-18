import OfferList from '@/components/offer-list/offer-list.tsx';
import {Offer} from '@/types/api.ts';

interface NearbyOfferListProps {
  nearbyOffers: Offer[];
}

export default function NearbyOfferList({nearbyOffers}: NearbyOfferListProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          <OfferList offers={nearbyOffers} page={'near-places'}/>
        </div>
      </section>
    </div>);
}
