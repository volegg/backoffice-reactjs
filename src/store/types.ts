import { User } from "../api/types";

export type UserState = {
  user?: User;
};

export type State = {
  user: UserState;
}