import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  id: string;
  name: string;
  email: string;
};

const initialState: User = {} as User;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      console.log(action.payload);
      state.email = action.payload?.email;
      state.id = action.payload?.id;
      state.name = action.payload?.name;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
