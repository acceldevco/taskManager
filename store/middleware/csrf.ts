// import { createListenerMiddleware } from "@reduxjs/toolkit";
// import axios from "axios";
// // import { groupSlice } from "@/app/features/group/groupSlice";
// // import { taskSlice } from "@/app/features/tasks/taskSlice";

// // Middleware برای fetch CSRF token و inject به اکشن‌ها
// const csrfMiddleware = createListenerMiddleware();

// csrfMiddleware.startListening({
//   predicate: (action) => true, // یا محدود به اکشن‌های خاص
//   effect: async (action, listenerApi) => {
//     try {
//       const response = await axios.get("/api/csrf");
//       const csrfToken = (response.data as { csrfToken: string }).csrfToken;

//       // می‌تونی token رو به payload اکشن یا state اضافه کنی
//       listenerApi.dispatch({
//         type: "csrf/SET_TOKEN",
//         payload: csrfToken,
//       });
//     } catch (err) {
//       console.error("Failed to fetch CSRF token:", err);
//     }
//   },
// });

// export default csrfMiddleware;

//////////////////////////////////////////////////////////////////
import { createListenerMiddleware } from "@reduxjs/toolkit";
import axios from "axios";

const csrfMiddleware = createListenerMiddleware();

// flag برای جلوگیری از fetch چندباره
let csrfFetched = false;

csrfMiddleware.startListening({
  predicate: (action) => !csrfFetched, // فقط اگر token هنوز گرفته نشده باشه
  effect: async (action, listenerApi) => {
    try {
      const response = await axios.get("/api/csrf");
      const csrfToken = (response.data as { csrfToken: string }).csrfToken;

      csrfFetched = true; // بعد از اولین fetch، دیگر اجرا نشود

      listenerApi.dispatch({
        type: "csrf/SET_TOKEN",
        payload: csrfToken,
      });
    } catch (err) {
      console.error("Failed to fetch CSRF token:", err);
    }
  },
});

export default csrfMiddleware;
