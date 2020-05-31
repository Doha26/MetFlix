// action creators
import {M_API_REQUEST, M_CANCEL_API_REQUEST} from "~/actions/api-action/types";
import {SEARCH_ERROR, SEARCH_SUCCESS} from "~/actions/search-action/types";

export const mApiRequest = ({url}: { url: string }) => {
    return {
        type: M_API_REQUEST,
        meta: {url}
    };
};

export const mCancelApiRequest = () => {
    return {
        type: M_CANCEL_API_REQUEST,
    };
};

export const mApiSuccess = ({response}: { response: any }) => ({
    type: SEARCH_SUCCESS,
    payload: response
});

export const mApiError = ({error}: { error: any }) => ({
    type: SEARCH_ERROR,
    payload: error
});
