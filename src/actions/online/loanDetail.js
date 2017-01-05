import { get, responseStatus } from 'utils/fetch';

export default function(dispatch) {

  return (dispatch, getState) => {

    dispatch({ type: 'requestOnlineLoanDetail' })

    get('/loanctcf/contract-content').then(response => {
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineLoanDetail', detail: response.data })
      }
    })

  }

}
