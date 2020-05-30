import {
    CANCEL_SEARCH,
    SEARCH_ERROR, SEARCH_PENDING, SEARCH_SUCCESS, SET_QUERY,
} from '~/actions/search-action/types';

const INITIAL_STATE = {
    query: '',
    searching: false,
    has_results: false,
    search_results: null,
};

export default (state = INITIAL_STATE, {type, payload}: { type: any; payload: any }) => {
    switch (type) {
        case SEARCH_PENDING:
            return {...state, searching: true};
        case SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                search_results: payload,
                has_results: payload.length != 0
            };
        case SEARCH_ERROR:
            return {...state, searching: false, search_results: payload, has_results: false};
        case CANCEL_SEARCH:
            return {...state, searching: false, has_results: false};
        case SET_QUERY:
            return {...state, query: payload};
        default:
            return state;
    }
};
