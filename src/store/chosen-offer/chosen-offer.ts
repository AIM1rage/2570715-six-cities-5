import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChosenOffer} from '@/types/state.ts';
import {NameSpace} from '@/constants/namespaces.ts';
import {Comment, Offer} from '@/types/api.ts';
import {MAX_NEARBY_OFFERS_COUNT} from '@/constants/settings.ts';

const initialState: ChosenOffer = {
  offer: undefined,
  nearbyOffers: [],
  comments: [],
  notFound: false,
  isLoading: false,
};

export const chosenOffer = createSlice({
  name: NameSpace.ChosenOffer,
  initialState,
  reducers: {
    loadOffer: (state: ChosenOffer, action: PayloadAction<{
      offer: Offer;
      nearbyOffers: Offer[];
      comments: Comment[];
    }>) => {
      state.offer = action.payload.offer;
      state.nearbyOffers = action.payload.nearbyOffers.slice(0, MAX_NEARBY_OFFERS_COUNT);
      state.comments = action.payload.comments;
      state.notFound = false;
      state.isLoading = false;
    },
    setIsLoading: (state: ChosenOffer) => {
      state.notFound = false;
      state.isLoading = true;
    },
    setOfferNotFound: (state: ChosenOffer) => {
      state.notFound = true;
      state.isLoading = false;
    },
    addComment: (state: ChosenOffer, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    clearFavoriteOffersInChosenOffer: (state: ChosenOffer) => {
      const offers = state.nearbyOffers.concat(state.offer as Offer);
      offers.filter((offer) => offer).forEach((offer) => {
        offer.isFavorite = false;
      });
    },
    switchFavoriteStatusInChosenOffer(state, action: PayloadAction<Offer>) {
      const offers = state.nearbyOffers.concat(state.offer as Offer);
      const foundOffer = offers.find((offer) => offer?.id === action.payload.id);
      if (foundOffer) {
        foundOffer.isFavorite = action.payload.isFavorite;
      }
    }
  },
});

export const {
  loadOffer,
  addComment,
  setIsLoading,
  setOfferNotFound,
  clearFavoriteOffersInChosenOffer,
  switchFavoriteStatusInChosenOffer
} = chosenOffer.actions;
