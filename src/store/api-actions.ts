import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '@/constants/api-routes.ts';
import {AppDispatch, State} from '@/types/state.ts';
import {Comment, Offer, User} from '@/types/api.ts';
import {dropToken, saveToken} from '@/api/token.ts';
import {AuthData} from '@/types/auth-data.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import {CommentInfo} from '@/types/comment-info.ts';
import {
  addComment, clearFavoriteOffersInChosenOffer,
  loadOffer,
  setIsLoading,
  setOfferNotFound, switchFavoriteStatusInChosenOffer
} from '@/store/chosen-offer/chosen-offer.ts';
import {
  clearFavoriteOffersInMainOffers,
  loadOffers,
  setIsLoadingMainOffers,
  switchFavoriteStatusInMainOffers
} from '@/store/main-offers/main-offers.ts';
import {setAuthorizationStatus, setAvatarUrl, setEmail} from '@/store/app-user/app-user.ts';
import {
  setFavoriteOffersIsLoading,
  setFavoriteStatus,
  updateFavorites
} from '@/store/favorite-offers/favorite-offers.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsLoadingMainOffers());
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async ({offerId}, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoading());
      const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      const {data: nearbyOffers} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      const {data: comments} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(loadOffer({offer, nearbyOffers, comments}));
    } catch {
      dispatch(setOfferNotFound());
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {email, avatarUrl}} = await api.get<User>(APIRoute.Login);
      dispatch(setAvatarUrl(avatarUrl));
      dispatch(setEmail(email));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: login, password: password}, {dispatch, extra: api}) => {
    const {data: {token, email, avatarUrl}} = await api.post<User>(APIRoute.Login, {email: login, password});
    saveToken(token);
    dispatch(setAvatarUrl(avatarUrl));
    dispatch(setEmail(email));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(clearFavoriteOffersInChosenOffer());
    dispatch(clearFavoriteOffersInMainOffers());
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const postCommentAction = createAsyncThunk<void, CommentInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postComment',
  async ({comment, rating, offerId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(addComment(data));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFavoriteOffersIsLoading());
    const {data: offers} = await api.get<Offer[]>(`${APIRoute.Favorite}`);
    dispatch(updateFavorites(offers));
  }
);

export const postSwitchFavoriteStatus = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/postFavoriteOfferStatus',
  async (offer, {dispatch, extra: api}) => {
    const {data: updatedOffer} = await api.post<Offer>(`${APIRoute.Favorite}/${offer.id}/${offer.isFavorite ? 0 : 1}`);
    dispatch(setFavoriteStatus(updatedOffer));
    dispatch(switchFavoriteStatusInChosenOffer(updatedOffer));
    dispatch(switchFavoriteStatusInMainOffers(updatedOffer));
  }
);
