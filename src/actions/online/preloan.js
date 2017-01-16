import { post, responseStatus } from 'utils/fetch';


export default function() {

  return (dispatch, getState) => {
    var state = getState(), loan_type = state.online.loanType ? state.online.loanType.type : null;

    dispatch({type: 'submitPreloan'});

    return post('/loanctcf/preloan', {loan_type}).then(response => {

      if(response.res == responseStatus) {
        dispatch({ type: 'receivePreloan', preloan: response.data })
      }
      return response
    })
  }

}
