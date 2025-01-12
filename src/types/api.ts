type OfferType = string;
type Image = string;
type Url = string;

export type Offer = {
  id: string;
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
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type User = {
  name: string;
  avatarUrl: Url;
  isPro: boolean;
}
