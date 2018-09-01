import { CHANGE_ACCOUNT_NAME, CHANGE_ACCOUNT_WORLD } from "../actions/account.js";

const account = (
  state = {
    name: null,
    world: null
  },
  action
) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_NAME:
      return {
        ...state,
        name: action.name
      };
    case CHANGE_ACCOUNT_WORLD:
      return {
        ...state,
        world: action.world
      }
    default:
      return state;
  }
};

export default account;
