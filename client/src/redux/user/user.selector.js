import { createSelector } from "reselect";

const UserSelector = state => state.user;

export const tokenSelector = createSelector([UserSelector], user => user.token);

export const userDataSelector = createSelector(
  [UserSelector],
  user => user.user
);

export const isAuthenticatedSelector = createSelector(
  [UserSelector],
  user => user.isAuthenticated
);
