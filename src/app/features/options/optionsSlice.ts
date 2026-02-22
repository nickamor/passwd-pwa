import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOptions: false,
  options: {
    passwdLength: 24,
    nUpper: 1,
    nLower: 1,
    nNumeric: 1,
    nSpecial: 1,
    specialCharset: "!@#$%^*()-_=+",
  },
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    toggleOptions: (state) => {
      state.showOptions = !state.showOptions;
    },

    changeOption: (state, action) => {
      state.options[action.payload.name] = action.payload.value;
    },

    loadOptions: (state, action) => {
      state.options = { ...action.payload };
    },
  },
});

export const { toggleOptions, changeOption, loadOptions } =
  optionsSlice.actions;

export default optionsSlice.reducer;
