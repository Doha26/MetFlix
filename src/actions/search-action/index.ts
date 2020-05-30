import {
    CANCEL_SEARCH, SET_QUERY, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_PENDING, SEARCH_CANCELED, CAN_PERFORM_SEARCH
} from "./types";
import {API_BASE_URL, THEMOVIEDB_API_KEY, THEMOVIEDB_QUERY_TYPE} from "~/constants";
import api from "~/services";

export const search = (query: string) => (dispatch: Function, getState: any) => {

    const {searchReducer} = getState();

    //dispatch(setQueryString(`${API_BASE_URL}${THEMOVIEDB_QUERY_TYPE.SEARCH}?query=${query}`));

    const params = {
        api_key: THEMOVIEDB_API_KEY,
    };

    try {
        dispatch({type: SEARCH_PENDING});
        api.get(`${API_BASE_URL}${THEMOVIEDB_QUERY_TYPE.SEARCH}?query=${query}`, {params})
            .then(({data}) => {

                const {search_canceled} = searchReducer;

                if (!search_canceled) { // if the search has not been canceled , dispatch results
                    dispatch({type: SEARCH_SUCCESS, payload: data.results})
                }
            })
            .catch((err: any) => {
                dispatch({type: SEARCH_ERROR, payload: err})
            });
    } catch (err) {
        dispatch({type: SEARCH_ERROR, payload: err});
        dispatch({type: CANCEL_SEARCH});
        dispatch({type: SEARCH_CANCELED});
    }
};

export const cancelSearch = () => (dispatch: Function) => {
    dispatch({type: CANCEL_SEARCH});
    dispatch({type: SEARCH_CANCELED});
};

export const canPerformSearch = () => (dispatch: Function) => {
    dispatch({type: CAN_PERFORM_SEARCH});
};

export const setQueryString = (query: string) => ({type: SET_QUERY, payload: query});
