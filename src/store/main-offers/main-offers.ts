import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/namespaces.ts';
import {MainOffers} from '@/types/state.ts';
import {Offer} from '@/types/api.ts';

const initialState: MainOffers = {
  mainOffers: [],
  isLoading: false,
};

export const mainOffers = createSlice({
  name: NameSpace.MainOffers,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.mainOffers = action.payload;
      state.isLoading = false;
    },
    setIsLoadingMainOffers: (state) => {
      state.isLoading = true;
    },
    switchFavoriteStatusInMainOffers: (state, action: PayloadAction<Offer>) => {
      const foundOffer = state.mainOffers.find((offer) => offer?.id === action.payload.id);
      if (foundOffer) {
        foundOffer.isFavorite = action.payload.isFavorite;
      }
    },
    clearFavoriteOffersInMainOffers: (state) => {
      state.mainOffers.forEach((offer) => {
        offer.isFavorite = false;
      });
    }
  },
});

export const {
  loadOffers,
  setIsLoadingMainOffers,
  switchFavoriteStatusInMainOffers,
  clearFavoriteOffersInMainOffers
} = mainOffers.actions;
