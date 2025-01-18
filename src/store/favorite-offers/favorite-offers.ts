import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/namespaces.ts';
import {Offer} from '@/types/api.ts';
import {FavoriteOffers} from '@/types/state.ts';

const initialState: FavoriteOffers = {
  favoriteOffers: [],
  isLoading: false,
};

export const favoriteOffers = createSlice({
  name: NameSpace.FavoriteOffers,
  initialState,
  reducers: {
    updateFavorites: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
      state.isLoading = false;
    },
    setFavoriteStatus: (state, action: PayloadAction<Offer>) => {
      if (!action.payload.isFavorite) {
        state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
      } else if (action.payload.isFavorite && !state.favoriteOffers.find((offer) => offer.id === action.payload.id)) {
        state.favoriteOffers.push(action.payload);
      }
    },
    setFavoriteOffersIsLoading: (state) => {
      state.isLoading = true;
    }
  },
});

export const {updateFavorites, setFavoriteStatus, setFavoriteOffersIsLoading} = favoriteOffers.actions;
