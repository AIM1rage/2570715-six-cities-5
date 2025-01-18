import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '@/constants/app-routes.ts';
import {Offer} from '@/types/api.ts';
import {capitalize} from '@/utils/utils.ts';
import {memo} from 'react';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import {
  postSwitchFavoriteStatus
} from '@/store/api-actions.ts';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {getAuthorizationStatus} from '@/store/app-user/selectors.ts';
import {useAppDispatch} from '@/hooks/use-app-dispatch.tsx';

export interface PlaceCardProps {
  offer: Offer;
  page: string;
  width: number;
  height: number;
}

function PlaceCard({offer, page, width, height}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleSwitchFavoriteStatus = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(postSwitchFavoriteStatus(offer));
  };

  return (
    <article className={`${page}__card place-card`}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">
                        /&nbsp;night
            </span>
          </div>
          <button
            className={`place-card__bookmark-button${offer.isFavorite && '--active'} button`}
            type="button"
            onClick={handleSwitchFavoriteStatus}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 100 / 5}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </article>);
}

const MemoizedPlaceCard = memo(PlaceCard, (prevProps, nextProps) =>
  JSON.stringify(prevProps.offer) === JSON.stringify(nextProps.page));
export default MemoizedPlaceCard;
