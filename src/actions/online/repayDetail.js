import { get, post, responseStatus } from 'utils/fetch';

export default function(dispatch) {

  return (dispatch, getState) => {
    var state = getState(), loan_type = parseInt(state.online.loanType.type) || 0;

    dispatch({ type: 'requestOnlineRepayDetail' })

    post(`/loanctcf/repay-detail`, {loan_type}).then(response => {

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineRepayDetail', detail: response.data })
      }
    })

  }

}