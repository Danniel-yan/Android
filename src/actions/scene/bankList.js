
import { get } from 'utils/fetch'

export function requestBankList(){
  return {
    type : 'requestBankList'
  }
}

export function receiveBankList(bankList){
  return {
    type : 'receiveBankList',
    bankList : bankList
  }
}

export function fetchBankList(){

  return function (dispatch){

    dispatch(requestBankList())

    return get('/card/bank-list')
      .then(bankList => dispatch(receiveBankList(bankList.data)))
      .catch(err => console.log(err))

  }
}