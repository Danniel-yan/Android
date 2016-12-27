import { get, responseStatus } from 'utils/fetch';

export default function() {

  return (dispatch, getState) => {

    dispatch({type: 'requestPreloanStatus'});

    get('/loanctcf/check-preloan').then(response => {

      if(response.res == responseStatus.success) {
        dispatch({type: 'receivePreloanStatus', status: response.data})
      }

    })
  }

}
