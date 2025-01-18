import GroupedFavoriteOffers from '@/components/grouped-favorite-offers/grouped-favorite-offers.tsx';
import {Offer} from '@/types/api.ts';
import {memo} from 'react';

interface FavoriteOfferListProps {
  offers: Offer[];
}

function FavoriteOfferList({offers}: FavoriteOfferListProps) {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        <GroupedFavoriteOffers offers={offers}/>
      </ul>
    </section>);
}

const MemoizedFavoriteOfferList = memo(FavoriteOfferList, (prevProps, nextProps) =>
  prevProps.offers.map((offer) => offer.id).join() === nextProps.offers.map((offer) => offer.id).join());
export default MemoizedFavoriteOfferList;
