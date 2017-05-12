import { get, post, responseStatus } from 'utils/fetch';
import actions from 'actions/online';
import { loanType } from 'constants';

export default function(dispatch) {

  return (dispatch) => {
    dispatch({ type: 'requestOnlineUserCreditConfig' })

    post(`/credit-level/config`).then(response => {
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineUserCreditConfig', detail: response.data })
      }
    })

  }

}
