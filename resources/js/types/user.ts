export type CurrentUser = {
  id: number;
  name: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
};

export type Room = {
  id: number;
  name: string;
  user: User;
};
