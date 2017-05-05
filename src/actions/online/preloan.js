import { post, mock, responseStatus } from 'utils/fetch';


export default function() {

  return (dispatch, getState) => {
    var state = getState(), loan_type = state.online.loanType ? state.online.loanType.type : null;

    dispatch({type: 'submitPreloan'});

    return post('/loanctcf/preloan', {loan_type}).then(response => {

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receivePreloan', data: response.data })
      }
      return response;
    })
  }

}
