import { get, responseStatus } from 'utils/fetch';

export default function() {

  return dispatch => {

    dispatch({type: 'requestOnlineYysResult'});

    get('/bill/yys-ctcf-result').then(response => {
      if(response.res = responseStatus.success) {
        dispatch({type: 'receiveOnlineYysResult', status: response.data.status})
      }
    })
  }
}
