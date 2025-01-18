import {store} from '@/store';
import {SortOption} from '@/types/sort-option.ts';
import {City, Comment, Offer, User} from '@/types/api.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export type AppData = {
  city: City;
  sortOption: SortOption;
  selectedOffer: Offer | undefined;
};

export type AppUser = Omit<User, 'isPro' | 'name'> & {
  authorizationStatus: AuthorizationStatus;
};

export type ChosenOffer = {
  offer: Offer | undefined;
  nearbyOffers: Offer[];
  comments: Comment[];
  notFound: boolean;
  isLoading: boolean;
};

export type MainOffers = {
  mainOffers: Offer[];
  isLoading: boolean;
};

export type FavoriteOffers = {
  favoriteOffers: Offer[];
  isLoading: boolean;
};
