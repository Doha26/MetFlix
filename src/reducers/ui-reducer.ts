import theme from '~/theming/theme';

import {
    UI_CHANGE_THEME,
} from '~/actions/ui-actions/types';
import {UIReducerType} from "~/types/UIReducerType";


const INITIAL_STATE : UIReducerType = {
    theme: [],
};

export default (state = INITIAL_STATE, {type}: { type: string; }) => {
    switch (type) {
        case UI_CHANGE_THEME:
            // @ts-ignore
            return {
                ...state,
                theme: theme.dark  // Return Dark theme by default . will be updated with darkTheme implementation
            };
        default:
            return state;
    }
};
