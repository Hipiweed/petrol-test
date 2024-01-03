export type User = {
  id: number | null;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UserData = {
  data: {
    id: number | null;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
};

export type UsersData = {
  data: {
    id: number | null;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
};
