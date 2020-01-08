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

export const isLoadingSelector = createSelector(
  [UserSelector],
  user => user.isLoading
);

export const notesSelector = createSelector([UserSelector], user => user.notes);
