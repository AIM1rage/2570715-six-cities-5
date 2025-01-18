import {Token} from '@/api/token.ts';

export type OfferType = string;
export type Image = string;
export type Url = string;
export type Guid = string;
export type Good = string;
export type Email = string;

export type Offer = {
  id: Guid;
  type: OfferType;
  isFavorite: boolean;
  isPremium: boolean;
  price: number;
  rating: number;
  title: string;
  previewImage: Image;
  description: string;
  bedrooms: number;
  maxAdults: number;
  city: City;
  location: Location;
  images: Image[];
  host: User;
  goods: Good[];
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Comment = {
  id: Guid;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type User = {
  name: string;
  email: Email;
  avatarUrl: Url;
  isPro: boolean;
  token: Token;
};
