import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { passwd } from "../../passwd";

const initialState = { value: "" };

export const generatePassword = createAsyncThunk(
  "password/generate",
  async (_, { getState }) => {
    const state = getState();
    const newPassword = passwd(state.options.options);
    return newPassword;
  },
);

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generatePassword.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default passwordSlice.reducer;
