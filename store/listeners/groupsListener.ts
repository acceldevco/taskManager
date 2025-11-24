// src/store/listeners/groupsListener.ts
import { fetchGroups, handleGroup } from "@/app/features/group/groupSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";
// import { handleGroup, fetchGroups } from "";

const groupsListener = createListenerMiddleware();

groupsListener.startListening({
  actionCreator: handleGroup.fulfilled,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(fetchGroups());
  },
});

export default groupsListener;
