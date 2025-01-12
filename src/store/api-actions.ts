import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '@/constants/api-routes.ts';
import {
  redirectToRoute,
  requireAuthorization,
  loadOffers,
  setIsLoading,
  loadOffer, setOfferNotFoundStatus
} from '@/store/action.ts';
import {AppDispatch, AppState} from '@/types/state.ts';
import {Comment, Offer} from '@/types/api.ts';
import {dropToken, saveToken} from '@/api/token.ts';
import {AuthData} from '@/types/auth-data.ts';
import {UserData} from '@/types/user-data.ts';
import {AppRoute} from '@/constants/app-routes.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsLoading(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setIsLoading(false));
    dispatch(loadOffers({offers: data}));
  },
);

export const fetchOfferAction = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async ({offerId}, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoading(true));
      const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      const {data: nearbyOffers} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      const {data: comments} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setIsLoading(false));
      dispatch(loadOffer({offer, nearbyOffers, comments}));
    } catch {
      dispatch(setOfferNotFoundStatus(true));
      dispatch(setIsLoading(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password: password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
