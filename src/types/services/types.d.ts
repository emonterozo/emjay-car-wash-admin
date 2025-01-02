export type ErrorProps = {
  field: string;
  message: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    token: string;
    user: {
      id: string;
      type: string;
      username: string;
    };
  };
  errors: ErrorProps[];
};

export type Price = {
  size: string;
  price: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'car' | 'motorcycle';
  ratings: number;
  reviews_count: number;
  last_review: string | null;
  price_list: Price[];
};

export type ServicesResponse = {
  data: {
    services: Service[];
  };
  errors: ErrorProps[];
};
