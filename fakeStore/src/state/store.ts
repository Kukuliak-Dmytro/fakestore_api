import reducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
    reducer: {
        user: reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;