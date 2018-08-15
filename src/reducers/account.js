import { 
  CHANGE_ACCOUNT_NAME
} from "../actions/account.js";

const account = (
  state = {
    name: null,
  },
  action
) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_NAME:
      return {
        ...state,
        name: action.name
      }
    default:
      return state;
  }
};

export default account;