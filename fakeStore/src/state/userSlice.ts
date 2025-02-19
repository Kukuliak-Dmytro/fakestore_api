import { createSlice } from "@reduxjs/toolkit";
export interface UserState {
    user: {
        id: number;
        token: string;
        wishlistIds: number[]
    };
}
const initialState: UserState = {
    user: {
        id: 0,
        token: "",
        wishlistIds: [],
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
                wishlistIds: state.user.wishlistIds
            };
        },
        addWishlistItem: (state, action) => {
            state.user.wishlistIds.push(action.payload);
            
        },
        removeWishlistItem: (state, action) => {
            state.user.wishlistIds = state.user.wishlistIds?.filter((id) => id !== action.payload);
            console.log(state.user.wishlistIds)
            
        }
    },
})
export const { login, logout,addWishlistItem,removeWishlistItem } = userSlice.actions;
export default userSlice.reducer;