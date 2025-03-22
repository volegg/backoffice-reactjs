import { createSelector } from '@reduxjs/toolkit';

import type { State } from '../store';
import { AppRoles } from '../../const/roles';

function getState(state: State) {
  return state.userReducer;
}

export const selectLoggedUser = createSelector(getState, (state) => {
  return state.user;
});

export const selectIsAdmin = createSelector(selectLoggedUser, (user) => {
  return !!user && user.roles.includes(AppRoles.admin);
});