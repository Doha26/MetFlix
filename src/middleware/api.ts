/* This middleware will be use to handle Api Request properly.
 we will take advantage of the cancelToken of Axios in the case the user decide to cancel search */

import axios from "axios";
import {
    mApiError,
    mApiSuccess,
} from "~/actions/api-actions/index";

import {M_API_REQUEST, M_CANCEL_API_REQUEST} from "~/actions/api-actions/types";
import {THEMOVIEDB_API_KEY} from "~/constants";
import {AxiosCancelToken} from '~/services/axios-cancel-token'


const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const AxiosCancelTokenObject = new AxiosCancelToken();

const apiMiddleware = ({dispatch}: { dispatch: Function }) => (next: Function) => (action: any) => {
    next(action);

    const params = {
        api_key: THEMOVIEDB_API_KEY, // Set the API KEY since we use a protected ressources
    };

    axios.defaults.headers = params; // set the api key as header param

    AxiosCancelTokenObject.cancelAndCreateToken(); // Cancel previous token and create a new one

    if (action.type === M_API_REQUEST) {

        const {url} = action.meta;

        axios.get(url, {
            cancelToken: AxiosCancelTokenObject.cancel_resquest.token, // Get the new created token and set it for the request
            params
        })
            .then(({data}) => {

                // On success , dispatch results
                dispatch(mApiSuccess({response: data.results}));

                // Cancel current token
                AxiosCancelTokenObject.resetCancelToken();
            })
            .catch(error => {
                console.log(error);
                if (axios.isCancel(error)) {
                    console.log(error.message);
                } else {
                    // On error , dispatch error
                    dispatch(mApiError({error: error.response.data})); // In case off error , dispatch the error
                }
            });
    } else if (action.type === M_CANCEL_API_REQUEST) {
        source.cancel("Operation canceled by the user.");
        console.log("REQUEST CANCELLED!!!");
    }
};

export default apiMiddleware;
