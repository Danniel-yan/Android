import { get, responseStatus } from 'utils/fetch';


export default function() {

  return dispatch => {
    dispatch({type: 'submitPreloan'});

    return get('/loanctcf/preloan').then(response => {

      if(response.res == responseStatus) {
        dispatch({ type: 'receivePreloan', preloan: response.data })
      }
      return response
    })
  }

}
