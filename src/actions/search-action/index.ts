import {
    SEARCH,
    CANCEL_SEARCH, SET_QUERY, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_PENDING
} from "./types";
import {API_BASE_URL, THEMOVIEDB_API_KEY, THEMOVIEDB_QUERY_TYPE} from "~/constants";
import api from "~/services";

export const search = (query: string) => (dispatch, getState) => {
    dispatch(setQueryString(`${API_BASE_URL}${THEMOVIEDB_QUERY_TYPE.SEARCH}?query=${query}`));
    const params = {
        api_key: THEMOVIEDB_API_KEY,
    };
    try {
        dispatch({type: SEARCH_PENDING});
        api.get(`${API_BASE_URL}${THEMOVIEDB_QUERY_TYPE.SEARCH}?query=${query}`, {params})
            .then(({data}) => {
                dispatch({type: SEARCH_SUCCESS, payload: data.results})
            })
            .catch((err: any) => {
                dispatch({type: SEARCH_ERROR, payload: err})
            });
    } catch (err) {
        dispatch({type: SEARCH_ERROR, payload: err})
    }
};

export const cancelSearch = () => ({type: CANCEL_SEARCH});

export const setQueryString = (query: string) => ({type: SET_QUERY, payload: query});
