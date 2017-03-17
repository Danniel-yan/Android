import { get, post, responseStatus } from 'utils/fetch';

export default function(dispatch) {
  return (dispatch, getState) => {
    var state = getState(), loan_type = parseInt(state.online.loanType.type) || 0;

    dispatch({ type: 'requestOnlineRepayAmount' })

    post(`/loanctcf/repay-amount`, {loan_type}).then(response => {

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineRepayAmount', detail: response.data })
      }
    })

  }

}

export function receiveRepaymentAmount(amount) {
  return (dispatch, getState) => {
    var state = getState(), repayAmount = state.online.repayAmount;
    repayAmount.amount = amount;
    dispatch({type: 'receiveOnlineRepaymentAmount',detail: repayAmount});
  }
}
