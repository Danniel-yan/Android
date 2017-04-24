import { get, post, responseStatus } from 'utils/fetch';

export default function(dispatch) {
  return (dispatch, getState) => {
    var state = getState(), loan_type = parseInt(state.online.loanType.type) || 0;

    dispatch({ type: 'requestOnlineRepayAmount' })

    post(`/loanctcf/repay-amount`, {loan_type}).then(response => {

      response = {
        "res": 1,
        "data": {
          "status":0,//0=查询正常，1=暂无数据
          "amount": 18139.08, //应还金额
          "tips": [ //还款提示信息
            "本期应还金额为18139.08元，最后还款期限为2017-04-01",
            "本次最低还款500元，最高还款18139.08元",
            "点击确认还款后，将从您绑定的银行卡中划扣档期还款金额，请确保卡内余额充足"
          ]
        }
      }
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineRepayAmount', detail: response.data })
      }
    })

  }

}

export function receiveRepaymentAmount(amount, tips) {
  return (dispatch, getState) => {
    var state = getState(), repayAmount = state.online.repayAmount;
    repayAmount.amount = amount;
    repayAmount.tips = tips;
    dispatch({type: 'receiveOnlineRepaymentAmount',detail: repayAmount});
  }
}
