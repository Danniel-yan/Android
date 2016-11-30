import { get } from 'utils/fetch';

export function requestRepayCalc(){
  return {
    type : 'requestRepayCalc'
  }
}

export function receiveRepayCalc(repayCalc, fetchedParams){
  return {
    type : 'receiveRepayCalc',
    repayCalc,
    fetchedParams: fetchedParams
  }
}
export function fetchRepayCalc(params){

  console.log('........' + params);

  return function (dispatch){

    dispatch(requestRepayCalc())

    post(`/loan/repay-calc`,{ id: params.id , amount: params.amount, period: params.period})
      .then(response => dispatch(receiveRepayCalc(response.data)))
      .catch(err => console.log(err))
  }
}