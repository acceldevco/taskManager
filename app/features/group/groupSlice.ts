import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { setgroups } from "process";

// ابزار کمکی برای ساخت توکن JWT در بک‌اند (در سرور انجام میشه)
const API_URL = "/api/main";

// 🟢 خواندن گروه‌ها
export const fetchGroups = createAsyncThunk(
  "groups/fetchAll",
  async ({ skip = 1, take = 5 }: any) => {
    const res = await fetch(`/api/getdatagroup?skip=${skip}&&take=${take}`);
    if (!res.ok) throw new Error("Failed to fetch groups");
    return res.json();
  }
);

// 🟢 افزودن / ویرایش / حذف گروه
export const handleGroup = createAsyncThunk(
  "groups/handle",
  async ({
    token = "",
    table,
    data,
  }: {
    token: string;
    table: string;
    data: any;
  }) => {
    // console.log(table, data);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        data
        // داده‌ای که بک‌اند با jwt.verify دیکد می‌کند
        // (توکن JWT باید در سرور با همین ساختار ساخته شود)
        // jwtSign({ table, data }, token)
      ),
    });
    if (!res.ok) throw new Error("Failed to handle group");
    return res.json();
  }
);

// ابزار ساخت JWT موقت در کلاینت (اختیاری – در محیط واقعی فقط در سرور)
// function jwtSign(payload: any, secret: string) {
//   // در کلاینت بهتره رمزگذاری واقعی انجام نشه — این صرفاً برای تست
//   //   return btoa(JSON.stringify(payload));}
// }

const slice = createSlice({
  name: "groups",
  initialState: { list: [], loading: false },
  reducers: {
    setgroup(state, action: any) {
      // console.log(JSON.stringify(action.payload));
      
      state.list = action.payload;
    },
    ListMember(state: any, action: any) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, action) => {
        console.log(action.payload);

        state.list = action.payload;
      })
      .addCase(handleGroup.fulfilled, (state, action) => {
        const { result } = action.payload;
        if (Array.isArray(result)) {
          result.forEach((item) => {
            const i = state.list.findIndex((g: any) => g.id === item.id);
            if (i > -1) state.list[i] = item;
            else state.list.push(item);
          });
        }
      });
  },
});
export const { ListMember,setgroup } = slice.actions;
export default slice.reducer;
