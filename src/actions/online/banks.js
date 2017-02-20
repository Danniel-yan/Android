
import { get } from 'utils/fetch'

function request(){
  return {
    type : 'requestOnlineBanks'
  }
}

function receive(banks){
  return {
    type : 'receiveOnlineBanks',
    banks
  }
}

export default function fetchBanks(){

  return (dispatch, getState) => {

    dispatch(request())

    var state = getState(), loan_type = state.online.loanType ? state.online.loanType.type : 0;
    return get(`/bill/bank-list?loan_type=${loan_type}`)
      .then(res => dispatch(receive(res.data)))
      .catch(err => {
        dispatch({type: 'requestOnlineBanksError', err: err});
        console.log(err)
      })
  }
}
