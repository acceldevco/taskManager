import { configureStore } from "@reduxjs/toolkit";
import groupSlice from "@/app/features/group/groupSlice";
import taskSlice from "@/app/features/tasks/taskSlice";
// import groupsListener from "./listeners/groupsListener";
// import tasksListener from "./listeners/tasksListener";
import csrfMiddleware from "./middleware/csrf";
export const store = configureStore({
  reducer: {
    group: groupSlice,
    task: taskSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware()
  //     // .prepend(csrfMiddleware.middleware)
  //     .prepend(groupsListener.middleware)
  //     .prepend(tasksListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
