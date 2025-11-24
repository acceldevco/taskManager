// /store/tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  [key: string]: any;
}

interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

interface Board {
  id: string;
  columns: Column[];
}

interface TasksState {
  list: Board[];
}

const initialState: TasksState = {
  list: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Board[]>) {
      state.list = action.payload;
    },
    moveTask(
      state,
      action: PayloadAction<{
        fromColumnId: string;
        toColumnId: string;
        fromIndex: number;
        toIndex: number;
      }>
    ) {
      const { fromColumnId, toColumnId, fromIndex, toIndex } = action.payload;
      // console.log(JSON.stringify(state.list[0]?.columns));

      const fromCol = state.list[0]?.columns?.find(
        (c) => c.id === fromColumnId
      );
      const toCol = state.list[0]?.columns?.find((c) => c.id === toColumnId);
      if (!fromCol || !toCol) return;
      const [moved] = fromCol.tasks.splice(fromIndex, 1);
      toCol.tasks.splice(toIndex, 0, moved);
    },

    moveColumn(
      state:any,
      action: PayloadAction<{
        fromOrder: number;
        toOrder: number;
      }>
    ) {
      const { fromOrder, toOrder } = action.payload;
      const mainPage = state.list?.pages?.[0];
      if (!mainPage || !Array.isArray(mainPage.columns)) return;

      // پیدا کردن ایندکس‌ها براساس order
      const fromIndex = mainPage.columns.findIndex(
        (col:any) => col.order === fromOrder
      );
      const toIndex = mainPage.columns.findIndex(
        (col:any) => col.order === toOrder
      );

      // بررسی معتبر بودن
      if (fromIndex === -1 || toIndex === -1) {
        console.warn("Invalid column order");
        return;
      }

      // جابه‌جایی ستون‌ها
      const [movedColumn] = mainPage.columns.splice(fromIndex, 1);
      mainPage.columns.splice(toIndex, 0, movedColumn);

      // آپدیت order بر اساس ترتیب جدید
      mainPage.columns.forEach((col:any, i:any) => {
        col.order = i + 1;
      });

      // برای اطمینان از آپدیت UI
      mainPage.columns = [...mainPage.columns];
    },
  },
});

export const { moveTask, setTasks, moveColumn } = tasksSlice.actions;
export default tasksSlice.reducer;
