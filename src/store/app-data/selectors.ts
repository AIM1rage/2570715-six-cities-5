import {State} from '@/types/state.ts';
import {City, Offer} from '@/types/api.ts';
import {NameSpace} from '@/constants/namespaces.ts';
import {SortOption} from '@/types/sort-option.ts';

export const getCity = (state: State): City => state[NameSpace.App].city;
export const getSortOption = (state: State): SortOption => state[NameSpace.App].sortOption;
export const getSelectedOffer = (state: State): Offer | undefined => state[NameSpace.App].selectedOffer;
