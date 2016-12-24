
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

  return (dispatch) => {

    dispatch(request())

    return get(`/bill/bank-list`)
      .then(res => dispatch(receive(res.data)))
      .catch(err => {
        dispatch({type: 'requestOnlineBanksError', err: err});
        console.log(err)
      })
  }
}

