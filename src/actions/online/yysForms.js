import { get, responseStatus } from 'utils/fetch';

function receive(forms) {
  return {
    type: 'receiveOnlineYysForms',
    forms
  };
}

export default function() {

  return (dispatch, getState) => {

    dispatch({type: 'requestOnlineYysForms'});

    get('/bill/yys-login-elements').then(response => {
      if(response.res == responseStatus.success) {
        dispatch(receive(response.data[0]))
      }
    })
  }
}
