import { post, mock, responseStatus } from 'utils/fetch';

export default function() {

  return (dispatch, getState) => {
    var state = getState(), loan_type = state.online.loanType ? state.online.loanType.type : null;

    dispatch({type: 'requestPreloanStatus'});

    // var fetchMethod = loan_type == 4 ? mock : post;
    var fetchMethod = false ? mock : post;
    return fetchMethod('/loanctcf/check-preloan', {loan_type}).then(response => {
      if(response.res == responseStatus.success) {
        dispatch({type: 'receivePreloanStatus', status: response.data})
      }
      return response;
    })
  }

}
