import {Offer} from '@/types/api.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants/app-routes.ts';
import PlaceCard from '@/components/place-card/place-card.tsx';
import {groupBy} from '@/utils/utils.ts';
import {memo} from 'react';

interface GroupedFavoriteOffersProps {
  offers: Offer[];
}

function GroupedFavoriteOffers({offers}: GroupedFavoriteOffersProps) {
  const groupedCityOffers = groupBy(offers, (offer) => offer.city.name, (offer) => offer);

  return Object.keys(groupedCityOffers).map((city) => (
    <li className="favorites__locations-items" key={city}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Root}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {groupedCityOffers[city].map((offer) =>
          <PlaceCard offer={offer} page={'favorites'} width={150} height={110} key={offer.id}/>)}
      </div>
    </li>));
}

const MemoizedGroupedFavoriteOffers = memo(GroupedFavoriteOffers, (prevProps, nextProps) =>
  prevProps.offers.map((offer) => offer.id).join() === nextProps.offers.map((offer) => offer.id).join());
export default MemoizedGroupedFavoriteOffers;
