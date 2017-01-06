import { get, responseStatus } from 'utils/fetch';


export default function() {

  // auto refresh
  return dispatch => {

    dispatch({type: 'requestOnlineBankResult'});

    get('/bill/bank-ctcf-result').then(response => {
      if(response.res == responseStatus.success) {
        dispatch({type: 'receiveOnlineBankResult', status: response.data.status})
      }
    })
  }
}
