import { createSlice } from "@reduxjs/toolkit";
export interface UserState {
    user: {
        id: number;
        token: string;
    };
}
const initialState: UserState = {
    user: {
        id: 0,
        token: "",
    },
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            console.log(state.user)
        },
        logout: (state) => {
            state.user = {
                id: 0,
                token: "",
            };
        },
    },
})
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;