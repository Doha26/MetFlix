import { SEARCH_PENDING, CANCEL_SEARCH } from "~/actions/search-action/types";
import { mApiRequest, mCancelApiRequest } from "~/actions/api-action/index";
import {API_BASE_URL, THEMOVIEDB_QUERY_TYPE} from "~/constants";

 const appMiddleware = () => (next:any) => (action:any) => {

     next(action);

    switch (action.type) {
        case SEARCH_PENDING: {
            next(
                mApiRequest({
                    url: `${API_BASE_URL}${THEMOVIEDB_QUERY_TYPE.SEARCH}?query=${action.payload}`
                })
            );
            break;
        }
        case CANCEL_SEARCH: {
            next(mCancelApiRequest());
            break;
        }
        default:
            break;
    }
};

 export default appMiddleware;
