import { get, post, responseStatus } from 'utils/fetch';
import actions from 'actions/online';
import { loanType } from 'constants';

export default function(dispatch) {

  return (dispatch) => {
    dispatch({ type: 'requestOnlineUserCreditLevel' })

    post(`/credit-level/user-credit-level`).then(response => {
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineUserCreditLevel', detail: response.data })
      }
    })

  }

}
