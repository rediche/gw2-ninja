export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_TIMER = "CHANGE_TIMER";
export const CHANGE_API_KEY = "CHANGE_API_KEY";
export const CHANGE_API_PERMISSIONS = "CHANGE_API_PERMISSIONS";

export const changeLanguage = language => dispatch => {
  const acceptedLanguages = ["en", "de", "fr", "es"];

  if (acceptedLanguages.includes(language)) {
    dispatch({
      type: CHANGE_LANGUAGE,
      language: language
    });
  }
};

export const changeTheme = theme => dispatch => {
  const acceptedThemes = ["core", "hot", "pof", "dark"];

  if (acceptedThemes.includes(theme)) {
    dispatch({
      type: CHANGE_THEME,
      theme: theme
    });
  }
};

export const changeTimer = timer => dispatch => {
  const acceptedTimers = ["normal", "compact"];

  if (acceptedTimers.includes(timer)) {
    dispatch({
      type: CHANGE_TIMER,
      timer: timer
    });
  }
}
