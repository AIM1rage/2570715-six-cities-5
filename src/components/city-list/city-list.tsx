import {City} from '@/types/api.ts';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {useAppDispatch} from '@/hooks/use-app-dispatch.tsx';
import {memo} from 'react';
import {getCity} from '@/store/app-data/selectors.ts';
import {setCity} from '@/store/app-data/app-data.ts';

export interface CityListProps {
  cities: City[];
}

function CityList({cities}: CityListProps) {
  const currentCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const handleCityChoose = (city: City) => {
    dispatch(setCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city.name}>
            <a
              className={`locations__item-link tabs__item ${city.name === currentCity.name ? 'tabs__item--active' : ''}`}
              onClick={() => handleCityChoose(city)}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>);
}

const MemoizedCityList = memo(CityList, (prevProps, nextProps) =>
  prevProps.cities.map((city) => city.name).join() === nextProps.cities.map((city) => city.name).join());
export default MemoizedCityList;
