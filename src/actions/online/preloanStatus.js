import { post, responseStatus } from 'utils/fetch';

export default function() {

  return (dispatch, getState) => {
    var state = getState(), loan_type = state.online.loanType ? state.online.loanType.type : null;

    dispatch({type: 'requestPreloanStatus'});

    return post('/loanctcf/check-preloan', {loan_type}).then(response => {

      if(response.res == responseStatus.success) {
        dispatch({type: 'receivePreloanStatus', status: response.data})
      }

    })
  }

}
