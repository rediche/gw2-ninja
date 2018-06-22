import {
  OPEN_COLLECTION_MODAL,
  CLOSE_COLLECTION_MODAL,
  UPDATE_COLLECTION_MODAL,
  SELECT_COLLECTION
} from "../actions/collections.js";

const collections = (
  state = {
    collectionModalOpened: false,
    selectedCollection: null
  },
  action
) => {
  switch (action.type) {
    case OPEN_COLLECTION_MODAL:
      return {
        ...state,
        collectionModalOpened: true
      };
    case CLOSE_COLLECTION_MODAL:
      return {
        ...state,
        collectionModalOpened: false
      };
    case UPDATE_COLLECTION_MODAL:
      return {
        ...state,
        collectionModalOpened: action.collectionModalOpened,
      };
    case SELECT_COLLECTION:
      return {
        ...state,
        selectedCollection: action.selectedCollection
      }
    default:
      return state;
  }
};

export default collections;
