import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  id: string;
  name: string;
  email: string;
} | null;

const initialState: User = null;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
