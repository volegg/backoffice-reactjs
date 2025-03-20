import { createSelector } from "@reduxjs/toolkit";

import type { State } from "../store";

function getState(state: State) {
  return state.userReducer;
}

export const selectLoggedUser = createSelector(getState, (state) => {
  return state.user;
});