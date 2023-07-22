import { passwd } from "./passwd.mjs";

export const rootReducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "generate":
      return {
        ...state,
        password: passwd(state.options),
      };
    case "toggleOptions":
      return {
        ...state,
        showOptions: !state.showOptions,
      };
    case "changeOption":
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
