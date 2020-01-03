import { createSelector } from "reselect";

const selectTask = state => state.task;

export const selectTasks = createSelector([selectTask], task =>
  task ? task.tasks : []
);

export const selectError = createSelector([selectTask], task =>
  task ? task.error : []
);

export const selectLoading = createSelector([selectTask], task => task.loading);
