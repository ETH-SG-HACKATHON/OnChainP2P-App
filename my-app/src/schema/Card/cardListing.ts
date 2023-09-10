export interface CardProfileListListingProps {
  id: number;
  token: string;
  amount: number;
  price: number;
  duration: string;
  notif: number | null;
}

export interface CardProfileListing {
  id: number;
  token: string;
  amount: number;
  price: number;
  duration: number;
  offers: [];
}
