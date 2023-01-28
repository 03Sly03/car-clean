export interface CarData {
  _id: string;
  slug: string;
  category: string;
  image: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  description: string;
  price: number;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}
