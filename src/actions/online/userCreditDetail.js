import {get, post, responseStatus} from 'utils/fetch';
import {loanType} from 'constants';

export default function (dispatch) {

    return (dispatch, getState) => {
        var routes = getState().navigation.routes
        for (var i = 0; i < routes.length; i++) {
            if (routes[i].key == 'CreditLoan') {
                dispatch({type: 'requestOnlineUserCreditDetail'})

                post(`/credit-level/user-credit-details`).then(response => {
                    if (response.res == responseStatus.success) {
                        dispatch({type: 'receiveOnlineUserCreditDetail', detail: response.data})
                    }
                })
                break;
            }
        }
    }
}
