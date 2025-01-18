import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppUser} from '@/types/state.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import {NameSpace} from '@/constants/namespaces.ts';

const initialState: AppUser = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarUrl: '',
  email: '',
  token: ''
};

export const appUser = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    }
  },
});

export const {setAuthorizationStatus, setEmail, setAvatarUrl} = appUser.actions;
