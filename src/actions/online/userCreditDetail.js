import { get, post, responseStatus } from 'utils/fetch';
import actions from 'actions/online';
import { loanType } from 'constants';

export default function(dispatch) {

  return (dispatch) => {
    dispatch({ type: 'requestOnlineUserCreditDetail' })

    post(`/credit-level/user-credit-details`).then(response => {
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineUserCreditDetail', detail: response.data })
      }
    })

  }

}
