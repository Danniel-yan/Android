import { get, post, responseStatus } from 'utils/fetch';

export default function(dispatch) {

  return (dispatch, getState) => {
    dispatch({ type: 'requestOnlineDepositoryResult' })
    post(`/payctcfcg/create-result`).then(response => {

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineDepositoryResult', detail: response.data })
      }
    })

  }

}
