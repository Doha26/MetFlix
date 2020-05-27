import {
  UI_CHANGE_THEME,
} from './types';

export const changeTheme = (theme: any) => {
  return ({
    type: UI_CHANGE_THEME,
    payload: theme,
  });
};
