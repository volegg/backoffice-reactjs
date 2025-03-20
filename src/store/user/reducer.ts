import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "../types";
import type { User } from "../../api/types";

function getInitialState(): UserState {
  return {
    user: undefined,
  };
}

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setLoggedUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
    reset() {
      return getInitialState();
    },
  },
});

export const userReducer = userSlice.reducer;
