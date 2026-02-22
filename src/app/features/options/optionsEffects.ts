import { createListenerMiddleware } from "@reduxjs/toolkit";
import { loadOptions, changeOption } from "./optionsSlice";
import { api } from "./optionsApi";

const listener = createListenerMiddleware();

listener.startListening({
  type: "init",
  effect: async (action, listenerApi) => {
    const result = await listenerApi.dispatch(
      api.endpoints.getOptions.initiate({})
    );
    if (result.data) {
      listenerApi.dispatch(loadOptions(result.data));
    }
  },
});

listener.startListening({
  actionCreator: changeOption,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    await listenerApi.delay(300);
    const state = listenerApi.getState();
    listenerApi.dispatch(
      api.endpoints.saveOptions.initiate(state.options.options)
    );
  },
});

export const { middleware } = listener;
