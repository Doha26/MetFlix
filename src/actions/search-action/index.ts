import {
    CANCEL_SEARCH,SEARCH_PENDING
} from "./types";


export const search = (query: string) => {
    return {
        type: SEARCH_PENDING,
        payload: query
    };
};

export const cancelSearch = () => (dispatch: Function) => {
    dispatch({type: CANCEL_SEARCH});
};

