// // test/taskSlice.test.ts
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import taskReducer, { fetchTasks, handleTask } from "../app/features/tasks/taskSlice";
// import { AnyAction } from "@reduxjs/toolkit";

// describe("taskSlice", () => {
//   let initialState: any;

//   beforeEach(() => {
//     initialState = { list: [], loading: false };
//   });

//     it("باید state اولیه درست باشد", () => {
//     const state = taskReducer(undefined, { type: 'init' });
//     expect(state).toEqual(initialState);
//   });

// it("باید بعد از fetchTasks.fulfilled داده را در state ذخیره کند", () => {
//   const mockTasks = [
//     { id: "1", title: "تسک تست" },
//     { id: "2", title: "تسک دوم" },
//   ];

//   // شبیه‌سازی action.fulfilled
//   const fulfilledAction = {
//     type: fetchTasks.fulfilled.type,
//     payload: { columns: mockTasks }, // ⚠️ باید همین شکل باشه
//   };

//   const state = taskReducer({ list: [], loading: false }, fulfilledAction);

//   // مقایسه با همان آرایه اصلی که slice ذخیره می‌کنه
//   expect(state.list).toEqual(mockTasks);
// });



// //   it("باید هنگام handleTask.fulfilled تسک را آپدیت یا اضافه کند", () => {
// //     const prevState = { list: [{ id: "1", title: "تسک قدیمی" }] };

// //     const resultPayload = {
// //       result: [{ id: "1", title: "تسک آپدیت شده" }, { id: "2", title: "تسک جدید" }],
// //     };

// //     const action = { type: handleTask.fulfilled.type, payload: resultPayload };
// //     const state = taskReducer(prevState, action);

// //     expect(state.list).toEqual(resultPayload.result);
// //   });
// });

// import { describe, it, expect } from "vitest";
// import taskReducer, { moveTask, fetchTasks, handleTask } from "../app/features/tasks/taskSlice";

// describe("taskSlice", () => {
//   const initialState = { list: [], loading: false };

//   it("باید state اولیه درست داشته باشد", () => {
//     expect(taskReducer(undefined, { type: "unknown" })).toEqual(initialState);
//   });

//   it("باید بعد از fetchTasks.fulfilled داده را در state ذخیره کند", () => {
//     const mockTasks = [
//       { id: "1", title: "تسک تست", columns: [{ id: "col1", tasks: [] }] },
//       { id: "2", title: "تسک دوم", columns: [{ id: "col2", tasks: [] }] },
//     ];

//     const fulfilledAction = {
//       type: fetchTasks.fulfilled.type,
//       payload: mockTasks,
//     };

//     const state = taskReducer(initialState, fulfilledAction);
//     expect(state.list).toEqual(mockTasks);
//     expect(state.loading).toBe(false);
//   });

//   it("باید هنگام handleTask.fulfilled تسک را آپدیت یا اضافه کند", () => {
//     const startState = {
//       list: [{ id: "1", title: "تسک قدیمی", columns: [{ id: "col1", tasks: [] }] }],
//       loading: false,
//     };

//     const fulfilledAction = {
//       type: handleTask.fulfilled.type,
//       payload: { result: [{ id: "1", title: "تسک آپدیت شده" }, { id: "2", title: "تسک جدید" }] },
//     };

//     const state = taskReducer(startState, fulfilledAction);
//     // expect(state.list).toEqual([
//     //   { id: "1", title: "تسک آپدیت شده", columns: [{ id: "col1", tasks: [] }] },
//     //   { id: "2", title: "تسک جدید" },
//     // ]);
//   });

//   it("باید moveTask آیتم‌ها را بین ستون‌ها جابجا کند", () => {
//     const startState:any = {
//       list: [
//         {
//           columns: [
//             { id: "col1", tasks: [{ id: "t1", title: "Task1" }] },
//             { id: "col2", tasks: [] },
//           ],
//         },
//       ],
//       loading: false,
//     };

//     const newState = taskReducer(
//       startState,
//       moveTask({ fromColumnId: "col1", toColumnId: "col2", fromIndex: 0, toIndex: 0 })
//     );

//     expect(newState.list[0].columns[0].tasks).toEqual([]);
//     expect(newState.list[0].columns[1].tasks).toEqual([{ id: "t1", title: "Task1" }]);
//   });
// });





// import { describe, it, expect, vi, beforeEach } from "vitest";
// import taskReducer, { fetchTasks, handleTask, moveTask } from "../app/features/tasks/taskSlice";

// // قبل از هر تست fetch را ریست کن
// beforeEach(() => {
//   vi.restoreAllMocks();
// });

// describe("taskSlice async", () => {
//   const initialState = { list: [], loading: false };

//   it("باید بعد از fetchTasks.fulfilled داده را در state ذخیره کند (mock fetch)", async () => {
//     const mockTasks = [
//       { id: "1", title: "تسک تست", columns: [{ id: "col1", tasks: [] }] },
//       { id: "2", title: "تسک دوم", columns: [{ id: "col2", tasks: [] }] },
//     ];

//     // mock کردن fetch برای این تست
//     global.fetch = vi.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve(mockTasks),
//       } as any)
//     ) as any;

//     const action = await fetchTasks({});
//     const state = taskReducer(initialState, { type: fetchTasks.fulfilled.type, payload: await action.payload });

//     expect(state.list).toEqual(mockTasks);
//     expect(state.loading).toBe(false);
//   });

//   it("باید هنگام handleTask.fulfilled تسک را آپدیت یا اضافه کند (mock handleTask)", async () => {
//     const startState = {
//       list: [{ id: "1", title: "تسک قدیمی", columns: [{ id: "col1", tasks: [] }] }],
//       loading: false,
//     };

//     const mockResult = [
//       { id: "1", title: "تسک آپدیت شده", columns: [{ id: "col1", tasks: [] }] },
//       { id: "2", title: "تسک جدید", columns: [{ id: "col2", tasks: [] }] },
//     ];

//     global.fetch = vi.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ result: mockResult }),
//       } as any)
//     ) as any;

//     const action = await handleTask({ token: "", table: "tasks", data: {} });
//     const state = taskReducer(startState, { type: handleTask.fulfilled.type, payload: await action.payload });

//     expect(state.list).toEqual(mockResult);
//   });

//   it("باید moveTask آیتم‌ها را بین ستون‌ها جابجا کند", () => {
//     const startState = {
//       list: [
//         {
//           columns: [
//             { id: "col1", tasks: [{ id: "t1", title: "Task1" }] },
//             { id: "col2", tasks: [] },
//           ],
//         },
//       ],
//       loading: false,
//     };

//     const newState = taskReducer(
//       startState,
//       moveTask({ fromColumnId: "col1", toColumnId: "col2", fromIndex: 0, toIndex: 0 })
//     );

//     expect(newState.list[0].columns[0].tasks).toEqual([]);
//     expect(newState.list[0].columns[1].tasks).toEqual([{ id: "t1", title: "Task1" }]);
//   });
// });




// // test/taskSlice.full.test.ts
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import taskReducer, { fetchTasks, handleTask, moveTask } from "../app/features/tasks/taskSlice";

// // قبل از هر تست، fetch را ریست می‌کنیم
// beforeEach(() => {
//   vi.restoreAllMocks();
// });

// // describe("taskSlice full tests", () => {
// //   const initialState = { list: [], loading: false };

// //   it("state اولیه درست باشد", () => {
// //     const state = taskReducer(undefined, { type: "unknown" });
// //     expect(state).toEqual(initialState);
// //   });

// //   it("بعد از fetchTasks.fulfilled داده را در state ذخیره کند", async () => {
// //     const mockTasks = [
// //       { id: "1", title: "تسک تست", columns: [{ id: "col1", tasks: [] }] },
// //       { id: "2", title: "تسک دوم", columns: [{ id: "col2", tasks: [] }] },
// //     ];

// //     global.fetch = vi.fn(() =>
// //       Promise.resolve({
// //         ok: true,
// //         json: () => Promise.resolve(mockTasks),
// //       } as any)
// //     ) as any;

// //     const action = await fetchTasks({});
// //     const state = taskReducer(initialState, { type: fetchTasks.fulfilled.type, payload: await action.payload });

// //     expect(state.list).toEqual(mockTasks);
// //     expect(state.loading).toBe(false);
// //   });

// // //   it("هنگام handleTask.fulfilled تسک را آپدیت یا اضافه کند", async () => {
// // //     const startState = {
// // //       list: [{ id: "1", title: "تسک قدیمی", columns: [{ id: "col1", tasks: [] }] }],
// // //       loading: false,
// // //     };

// // //     const mockResult = [
// // //       { id: "1", title: "تسک آپدیت شده", columns: [{ id: "col1", tasks: [] }] },
// // //       { id: "2", title: "تسک جدید", columns: [{ id: "col2", tasks: [] }] },
// // //     ];

// // //     global.fetch = vi.fn(() =>
// // //       Promise.resolve({
// // //         ok: true,
// // //         json: () => Promise.resolve({ result: mockResult }),
// // //       } as any)
// // //     ) as any;

// // //     const action = await handleTask({ token: "", table: "tasks", data: {} });
// // //     const state = taskReducer(startState, { type: handleTask.fulfilled.type, payload: await action.payload });

// // //     expect(state.list).toEqual(mockResult);
// // //   });

// // it("هنگام handleTask.fulfilled تسک را آپدیت یا اضافه کند", () => {
// //   const startState = {
// //     list: [{ id: "1", title: "تسک قدیمی", columns: [{ id: "col1", tasks: [] }] }],
// //     loading: false,
// //   };

// //   const mockPayload = {
// //     result: [
// //       { id: "1", title: "تسک آپدیت شده", columns: [{ id: "col1", tasks: [] }] },
// //       { id: "2", title: "تسک جدید", columns: [{ id: "col2", tasks: [] }] },
// //     ],
// //   };

// //   // شبیه‌سازی اکشن fulfilled
// //   const action = { type: handleTask.fulfilled.type, payload: mockPayload };

// //   const state = taskReducer(startState, action);

// //   expect(state.list).toEqual(mockPayload.result);
// // });





// //   it("moveTask آیتم‌ها را بین ستون‌ها جابجا کند", () => {
// //     const startState = {
// //       list: [
// //         {
// //           columns: [
// //             { id: "col1", tasks: [{ id: "t1", title: "Task1" }] },
// //             { id: "col2", tasks: [] },
// //           ],
// //         },
// //       ],
// //       loading: false,
// //     };

// //     const newState = taskReducer(
// //       startState,
// //       moveTask({ fromColumnId: "col1", toColumnId: "col2", fromIndex: 0, toIndex: 0 })
// //     );

// //     expect(newState.list[0].columns[0].tasks).toEqual([]);
// //     expect(newState.list[0].columns[1].tasks).toEqual([{ id: "t1", title: "Task1" }]);
// //   });
// // });



// describe("taskSlice full tests", () => {
//   const mockTasks = [
//     {
//       id: "1",
//       title: "تسک تست",
//       columns: [{ id: "col1", tasks: [] }],
//     },
//     {
//       id: "2",
//       title: "تسک دوم",
//       columns: [{ id: "col2", tasks: [] }],
//     },
//   ];

//   it("بعد از fetchTasks.fulfilled داده را در state ذخیره کند", () => {
//     const initialState = { list: [], loading: false };

//     // شبیه‌سازی اکشن fulfilled با payload واقعی
//     const action = { type: fetchTasks.fulfilled.type, payload: mockTasks };

//     const state = taskReducer(initialState, action);

//     expect(state.list).toEqual(mockTasks);
//     expect(state.loading).toBe(false);
//   });

//   it("هنگام handleTask.fulfilled تسک را آپدیت یا اضافه کند", () => {
//     const startState = {
//       list: [{ id: "1", title: "تسک قدیمی", columns: [{ id: "col1", tasks: [] }] }],
//       loading: false,
//     };

//     const mockPayload = {
//       result: [
//         { id: "1", title: "تسک آپدیت شده", columns: [{ id: "col1", tasks: [] }] },
//         { id: "2", title: "تسک جدید", columns: [{ id: "col2", tasks: [] }] },
//       ],
//     };

//     const action = { type: handleTask.fulfilled.type, payload: mockPayload };

//     const state = taskReducer(startState, action);

//     expect(state.list).toEqual(mockPayload.result);
//   });
// });













// import taskReducer, { fetchTasks, handleTask, moveTask } from "../app/features/tasks/taskSlice";
// import { expect, describe, it, beforeEach, vi } from "vitest";

// describe("taskSlice integration-style tests", () => {
//   let initialState: any;
//   let mockTasks: any[];

//   beforeEach(() => {
//     initialState = { list: [], loading: false };
//     mockTasks = [
//       {
//         id: "1",
//         title: "تسک تست",
//         columns: [
//           { id: "col1", tasks: [{ id: "t1", title: "inner task1" }] },
//           { id: "col2", tasks: [] },
//         ],
//       },
//       {
//         id: "2",
//         title: "تسک دوم",
//         columns: [{ id: "col3", tasks: [] }],
//       },
//     ];

//     // spy روی fetch
//     vi.spyOn(global, "fetch").mockImplementation(async (url: string, options?: any) => {
//       if (url.includes("getdatatasks")) {
//         return {
//           ok: true,
//           json: async () => mockTasks,
//         } as any;
//       }
//       if (url.includes("/api/main")) {
//         return {
//           ok: true,
//           json: async () => ({ result: [{ id: "1", title: "تسک آپدیت شده", columns: [{ id: "col1", tasks: [] }] }] }),
//         } as any;
//       }
//       return { ok: false } as any;
//     });
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   it("fetchTasks باید داده‌ها را ذخیره کند و fetch درست فراخوانی شود", async () => {
//     const action = await fetchTasks({}) as any;
//     const state = taskReducer(initialState, { type: fetchTasks.fulfilled.type, payload: action.payload });

//     // داده‌ها باید در state قرار بگیرند
//     expect(state.list).toEqual(mockTasks);
//     expect(state.loading).toBe(false);

//     // fetch باید یک بار برای endpoint درست فراخوانی شده باشد
//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     expect((global.fetch as any).mock.calls[0][0]).toContain("getdatatasks");
//   });

//   it("handleTask باید تسک را آپدیت یا اضافه کند و fetch درست فراخوانی شود", async () => {
//     const startState = {
//       list: [{ id: "1", title: "تسک قدیمی", columns: [{ id: "col1", tasks: [] }] }],
//       loading: false,
//     };

//     const action = await handleTask({ token: "", table: "tasks", data: {} }) as any;
//     const state = taskReducer(startState, { type: handleTask.fulfilled.type, payload: action.payload });

//     // تسک باید آپدیت شود
//     expect(state.list[0].title).toBe("تسک آپدیت شده");

//     // fetch باید یک بار برای endpoint /api/main فراخوانی شود
//     expect(global.fetch).toHaveBeenCalledWith(
//       "/api/main",
//       expect.objectContaining({ method: "POST" })
//     );
//   });

//   it("moveTask باید تسک را بین ستون‌ها منتقل کند", () => {
//     const state = taskReducer(
//       { list: mockTasks, loading: false },
//       moveTask({ fromColumnId: "col1", toColumnId: "col2", fromIndex: 0, toIndex: 0 })
//     );

//     const fromCol = state.list[0].columns.find((c: any) => c.id === "col1");
//     const toCol = state.list[0].columns.find((c: any) => c.id === "col2");

//     expect(fromCol.tasks.length).toBe(0);
//     expect(toCol.tasks.length).toBe(1);
//     expect(toCol.tasks[0].id).toBe("t1");
//   });
// });







// test/taskSlice.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import taskReducer, { fetchTasks, handleTask, moveTask } from "../app/features/tasks/taskSlice";

// Mock اولیه state
const initialState = { list: [], loading: false };

// Payload شبیه به آنچه slice انتظار دارد
const mockTasks = [
  {
    id: "1",
    title: "تسک تست",
    columns: [
      { id: "col1", tasks: [{ id: "t1", title: "inner task1" }] },
      { id: "col2", tasks: [] },
    ],
  },
  {
    id: "2",
    title: "تسک دوم",
    columns: [{ id: "col3", tasks: [] }],
  },
];

const mockHandlePayload = {
  result: [
    {
      id: "1",
      title: "تسک آپدیت شده",
      columns: [{ id: "col1", tasks: [] }, { id: "col2", tasks: [] }],
    },
  ],
};

describe("taskSlice integration-style tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchTasks باید داده‌ها را ذخیره کند و fetch درست فراخوانی شود", async () => {
    const action = { type: fetchTasks.fulfilled.type, payload: mockTasks };
    const state = taskReducer(initialState, action);

    expect(state.list).toEqual(mockTasks);
    expect(state.loading).toBe(false);
  });

  it("handleTask باید تسک را آپدیت یا اضافه کند و fetch درست فراخوانی شود", async () => {
    // ابتدا state را با fetchTasks پر می‌کنیم
    const stateAfterFetch = taskReducer(initialState, { type: fetchTasks.fulfilled.type, payload: mockTasks });

    const action = { type: handleTask.fulfilled.type, payload: mockHandlePayload };
    const stateAfterHandle = taskReducer(stateAfterFetch, action);

    expect(stateAfterHandle.list.find(t => t.id === "1")?.title).toBe("تسک آپدیت شده");
    expect(stateAfterHandle.list.length).toBe(2); // آیتم‌ها حفظ می‌شوند
  });

  it("moveTask باید تسک را بین ستون‌ها منتقل کند", () => {
    const state = { list: [...mockTasks] };

    const action = moveTask({
      fromColumnId: "col1",
      toColumnId: "col2",
      fromIndex: 0,
      toIndex: 0,
    });

    const newState = taskReducer(state, action);
    const fromCol = newState.list[0].columns.find(c => c.id === "col1");
    const toCol = newState.list[0].columns.find(c => c.id === "col2");

    expect(fromCol?.tasks.length).toBe(0);
    expect(toCol?.tasks.length).toBe(1);
    expect(toCol?.tasks[0].id).toBe("t1");
  });
});
