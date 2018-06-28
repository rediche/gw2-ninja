const GWN_KEY = "gwn";

export const saveState = (state) => {
  let stringifiedState = JSON.stringify(state);
  localStorage.setItem(GWN_KEY, stringifiedState);
}

export const loadState = () => {
  let json = localStorage.getItem(GWN_KEY) || '{}';
  let state = JSON.parse(json);

  if (state) {
    return state;
  } else {
    return undefined;  // To use the defaults in the reducers
  }
}