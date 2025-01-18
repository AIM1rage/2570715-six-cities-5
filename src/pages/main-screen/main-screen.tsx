import Header from '@/components/header/header.tsx';
import CityList from '@/components/city-list/city-list.tsx';
import MainOfferList from '@/components/main-offer-list/main-offer-list.tsx';
import EmptyMainOfferList from '@/components/empty-main-offer-list/empty-main-offer-list.tsx';
import Spinner from '@/components/spinner/spinner.tsx';
import {cities} from '@/constants/cities.ts';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {getCity, getSelectedOffer, getSortOption} from '@/store/app-data/selectors.ts';
import {getMainOffers, getMainOffersIsLoading} from '@/store/main-offers/selectors.ts';

export default function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const sortOption = useAppSelector(getSortOption);
  const selectedOffer = useAppSelector(getSelectedOffer);
  const offers = useAppSelector(getMainOffers);
  const isLoading = useAppSelector(getMainOffersIsLoading);

  return (
    <div className="page page--gray page--main">
      <Header/>
      {isLoading ? <Spinner/> :
        <main className={`page__main page__main--index ${offers.length === 0 && 'page__main--index-empty'}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CityList cities={cities}/>
          </div>
          <div className="cities">
            {offers.length > 0
              ? <MainOfferList city={city} selectedOffer={selectedOffer} offers={offers} sortOption={sortOption}/>
              : <EmptyMainOfferList city={city}/>}
          </div>
        </main>}
    </div>);
}
