import {NameSpace} from '@/constants/namespaces.ts';
import {Offer} from '@/types/api.ts';
import {State} from '@/types/state.ts';

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.FavoriteOffers].favoriteOffers;
export const getFavoriteOffersIsLoading = (state: State): boolean => state[NameSpace.FavoriteOffers].isLoading;
