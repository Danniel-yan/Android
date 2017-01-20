import { post, responseStatus } from 'utils/fetch';
import alert from 'utils/alert';

export function requestRepayCalc(){
  return {
    type : 'requestRepayCalc'
  }
}

export function fetchParamsReset(id) {
  return {
    type: 'fetchParamsReset',
    loanId: id
  }
}

export function receiveRepayCalc(repayCalc, fetchedParams){
  return {
    type : 'receiveRepayCalc',
    repayCalc,
    fetchedParams: fetchedParams
  }
}

export function receiveError(){
  return{
    type: 'receiveError'
  }
}

export function fetchRepayCalc(params){

  return function (dispatch){

    dispatch(requestRepayCalc())

    post(`/loan/repay-calc`,{ id: params.id , amount: params.amount, period: params.period})
      .then(response => {
        if(response.res === responseStatus.success) {
          dispatch(receiveRepayCalc(response.data, params))
        }else{
          alert(response.msg);
          dispatch(receiveError());
        }
      })
      .catch(err => console.log(err))
  }
}
