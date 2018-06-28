import { 
  CHANGE_LANGUAGE,
  CHANGE_THEME,
  CHANGE_API_KEY
} from "../actions/settings.js";

const settings = (
  state = {
    language: "en",
    theme: "pof",
    apiKey: null
  },
  action
) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      }
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      }
    case CHANGE_API_KEY:
      return {
        ...state,
        apiKey: action.apiKey
      }
    default:
      return state;
  }
};

export default settings;