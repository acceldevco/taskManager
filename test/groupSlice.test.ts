// import { describe, it, expect, vi } from "vitest";
// import reducer, { fetchGroups, handleGroup } from "@/app/features/group/groupSlice";

// // 🧠 حالت اولیه
// const initialState = {
//   list: [],
//   loading: false,
// };

// // ✅ Mock برای fetch
// global.fetch = vi.fn();

// // ===========================
// // 📌 تست fetchGroups
// // ===========================
// describe("groupSlice async thunks", () => {
//   it("should handle fetchGroups.fulfilled", async () => {
//     const mockGroups = [
//       { id: "1", name: "گروه ۱" },
//       { id: "2", name: "گروه ۲" },
//     ];

//     (fetch as any).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockGroups,
//     });

//     const action = await fetchGroups();
//     const result = await action(
//       () => {},
//       () => initialState,
//       undefined
//     );

//     // بررسی نتیجه برگشتی
//     expect(result.payload).toEqual(mockGroups);

//     // اجرای reducer
//     const newState = reducer(initialState, {
//       type: fetchGroups.fulfilled.type,
//       payload: mockGroups,
//     });

//     expect(newState.list).toHaveLength(2);
//     expect(newState.list[0].name).toBe("گروه ۱");
//   });

//   // ===========================
//   // 📌 تست handleGroup
//   // ===========================
//   it("should handle handleGroup.fulfilled (insert/update)", () => {
//     const prevState = {
//       list: [{ id: "1", name: "Old Group" }],
//       loading: false,
//     };

//     const payload = {
//       result: [{ id: "1", name: "Updated Group" }, { id: "2", name: "New Group" }],
//     };

//     const newState = reducer(prevState, {
//       type: handleGroup.fulfilled.type,
//       payload,
//     });

//     expect(newState.list).toHaveLength(2);
//     expect(newState.list[0].name).toBe("Updated Group");
//     expect(newState.list[1].name).toBe("New Group");
//   });
// });

import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import groupReducer, { fetchGroups, handleGroup } from "../app/features/group/groupSlice";

// یک Mock برای fetch درست می‌کنیم
global.fetch = vi.fn();

describe("groupSlice", () => {
  it("باید state اولیه درست داشته باشد", () => {
    const store = configureStore({ reducer: { groups: groupReducer } });
    const state = store.getState().groups;

    expect(state).toEqual({ list: [], loading: false });
  });

  it("باید بعد از fetchGroups.fulfilled، داده را در state ذخیره کند", async () => {
    // Mock پاسخ سرور
    const fakeGroups = [{ id: "1", name: "تست گروه" }];
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => fakeGroups,
    });

    const store = configureStore({ reducer: { groups: groupReducer } });
    await store.dispatch(fetchGroups());

    const state = store.getState().groups;
    expect(state.list).toEqual(fakeGroups);
  });

  it("باید هنگام handleGroup.fulfilled گروه را آپدیت یا اضافه کند", async () => {
    const store = configureStore({ reducer: { groups: groupReducer } });

    // مقدار اولیه
    store.dispatch({
      type: fetchGroups.fulfilled.type,
      payload: [{ id: "1", name: "گروه قدیمی" }],
    });

    // dispatch handleGroup
    const newGroup = { id: "1", name: "گروه جدید" };
    await store.dispatch({
      type: handleGroup.fulfilled.type,
      payload: { result: [newGroup] },
    });

    const state = store.getState().groups;
    expect(state.list[0].name).toBe("گروه جدید");
  });
});
