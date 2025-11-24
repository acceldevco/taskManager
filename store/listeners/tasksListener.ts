// src/store/listeners/groupsListener.ts
import { handleGroup } from "@/app/features/group/groupSlice";
import { fetchTasks, handleTask } from "@/app/features/tasks/taskSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";
// import { handleGroup, fetchGroups } from "";

const tasksListener = createListenerMiddleware();

tasksListener.startListening({
  actionCreator: handleTask.fulfilled,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(fetchTasks({}));
  },
});

export default tasksListener;

/////////////////////////////////
