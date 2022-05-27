import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  access_key: string;
}

const access_keyFromStorage = localStorage.getItem("access_key")
  ? localStorage.getItem("access_key")
  : "";

const initialState: UserSlice = {
  access_key: access_keyFromStorage || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.access_key = action.payload;
    },
    logout: (state) => {
      state.access_key = "";
      localStorage.removeItem("access_key");
    },
  },
});

export const { login, logout } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user.access_key;

export default store;
