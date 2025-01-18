import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/namespaces.ts';
import {appData} from '@/store/app-data/app-data.ts';
import {appUser} from '@/store/app-user/app-user.ts';
import {chosenOffer} from '@/store/chosen-offer/chosen-offer.ts';
import {mainOffers} from '@/store/main-offers/main-offers.ts';
import {favoriteOffers} from '@/store/favorite-offers/favorite-offers.ts';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  [NameSpace.User]: appUser.reducer,
  [NameSpace.MainOffers]: mainOffers.reducer,
  [NameSpace.FavoriteOffers]: favoriteOffers.reducer,
  [NameSpace.ChosenOffer]: chosenOffer.reducer,
});
