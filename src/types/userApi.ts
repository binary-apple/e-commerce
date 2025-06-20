export type UserAction = {
  [key: string]: string | Record<string, string>;
  action: string;
};

export type UpdateUserRequest = {
  version: number;
  actions: Array<UserAction>;
  accessToken: string;
};

export type UpdateUserResponse = {
  id: string;
  version: number;
};
