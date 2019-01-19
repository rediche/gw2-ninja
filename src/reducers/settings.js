import {
  CHANGE_LANGUAGE,
  CHANGE_THEME,
  CHANGE_TIMER,
  CHANGE_API_KEY,
  CHANGE_API_PERMISSIONS
} from "../actions/settings.js";

const settings = (
  state = {
    language: "en",
    timer: "normal",
    theme: "pof",
    apiKey: null,
    apiPermissions: []
  },
  action
) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case CHANGE_TIMER:
      return {
        ...state,
        timer: action.timer
      };
    case CHANGE_API_KEY:
      return {
        ...state,
        apiKey: action.apiKey
      };
    case CHANGE_API_PERMISSIONS:
      return {
        ...state,
        apiPermissions: action.apiPermissions
      };
    default:
      return state;
  }
};

export default settings;
