import { configureStore } from "@reduxjs/toolkit";

import { api } from "./features/options/optionsApi";
import { middleware } from "./features/options/optionsEffects";
import optionsSlice from "./features/options/optionsSlice";
import passwordSlice from "./features/password/passwordSlice";

export const store = configureStore({
  reducer: {
    password: passwordSlice,
    options: optionsSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware).concat(middleware),
});
