import axios from 'axios'



/* For search feature , user can start typing and finaly decide to cancel searching.
in this case, we need to cancel pending request. To do this ,
axios allows to set a TOKEN that identify a specific request and
this Token can be use to cancel a specific request. I created this
class to be use everywhere a request need to be canceled just by creating
new token for each request and after having results , reset the Token */

export class AxiosCancelToken {

    cancel_resquest: any = null;

    constructor() {
        // refference to API call
        this.cancel_resquest = null;
    }

    // Cancel API call if refference is there and create a new cancelToken for new API call
    cancelAndCreateToken() {
        if (this.cancel_resquest) {
            this.cancel_resquest.cancel();
        }
        this.cancel_resquest = axios.CancelToken.source();
    }

    // reset Cancel token
    resetCancelToken() {
        this.cancel_resquest = null;
    }
}
