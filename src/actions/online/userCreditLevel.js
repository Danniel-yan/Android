import { get, post, responseStatus } from 'utils/fetch';
import { loanType } from 'constants';
import tracker from 'utils/tracker.js';

export default function(dispatch) {

  return (dispatch,getState) => {
    var routes = getState().navigation.routes
    for(var i=0;i<routes.length;i++){
      if (routes[i].key == 'CreditLoan'){
        dispatch({ type: 'requestOnlineUserCreditLevel' })

        post(`/credit-level/user-credit-level`).then(response => {
          if(response.res == responseStatus.success) {
            tracker.trackAction({
              key: 'credit_loan',
              event: 'landing',
              exten_info: JSON.stringify({'status':response.data.credit_level})
            })
            dispatch({ type: 'receiveOnlineUserCreditLevel', detail: response.data })
          }
        })
        break;
      }
    }
  }
}
