import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppData} from '@/types/state';
import {NameSpace} from '@/constants/namespaces.ts';
import {cities} from '@/constants/cities.ts';
import {SortOption} from '@/types/sort-option.ts';
import {City, Offer} from '@/types/api.ts';

const initialState: AppData = {
  city: cities[5],
  sortOption: SortOption.Default,
  selectedOffer: undefined,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setSelectedOffer: (state, action: PayloadAction<Offer | undefined>) => {
      state.selectedOffer = action.payload;
    }
  },
});

export const {setCity, setSortOption, setSelectedOffer} = appData.actions;
