import theme from '~/theming/theme';

import {
  UI_CHANGE_THEME,
} from '~/actions/ui-action/types';

const INITIAL_STATE = {
  theme: theme.dark,
};

export default (state = INITIAL_STATE, {type, payload}: {type: any; payload: any}) => {
  switch (type) {
    case UI_CHANGE_THEME:
      return {
        ...state,
        theme: theme[payload],
      };
    default:
      return state;
  }
};
