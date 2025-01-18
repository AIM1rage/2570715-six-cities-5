import {State} from '@/types/state.ts';
import {Offer} from '@/types/api.ts';
import {NameSpace} from '@/constants/namespaces.ts';

export const getMainOffers = (state: State): Offer[] => state[NameSpace.MainOffers].mainOffers;
export const getMainOffersIsLoading = (state: State): boolean => state[NameSpace.MainOffers].isLoading;
