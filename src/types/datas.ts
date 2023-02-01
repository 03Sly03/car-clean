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

export interface MaintenanceData {
  slug: string;
  title: string;
  description: string;
  activities: [
    {
      name: string;
      description: string;
      tasks: [
        {
          name: string;
          description: string;
          price: number;
          minPrice: number;
          time: {
            days: number;
            hours: number;
            minutes: number;
          };
        }
      ];
    }
  ];
}
