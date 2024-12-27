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
