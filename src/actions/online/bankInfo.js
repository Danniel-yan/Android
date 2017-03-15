import { get, post, responseStatus } from 'utils/fetch';

export default function(dispatch) {

  return (dispatch, getState) => {
    var state = getState(), loan_type = parseInt(state.online.loanType.type) || 0;

    dispatch({ type: 'requestOnlineBankInfo' })

    post(`/loanctcf/contract-bank-info`, {loan_type}).then(response => {

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineBankInfo', detail: response.data })
      }
    })

  }

}
