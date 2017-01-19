import { AsyncStorage } from 'react-native';
import { get, post, responseStatus } from 'utils/fetch';

export default function requestUser() {

  return (dispatch, getState) => {

    dispatch({type: 'requetOnlineUser'});

    var state = getState(), loanType = state.online.loanType.type || 0;
    return post('/loanctcf/first-filter-status', loanType ? { loan_type: loanType } : {}).then(response => {
      if(response.res == responseStatus.success) {
        dispatch({type: 'receiveOnlineUser', user: response.data})
      } else {
        dispatch({type: 'receiveOnlineUserError' })
      }
    }).catch(err => {
      dispatch({type: 'requestOnlineUserError' })
    })
  }
}


export function creditScore() {
  return (dispatch, getState) => {
    dispatch({ type: "requestUserCreditScore" });

    return get("/user/credit-score").then(response => {
      if(response.res == responseStatus.success) {
        dispatch({type: "receiveUserCreditScore", score: response.data.score})
      }
    })
  }
}
