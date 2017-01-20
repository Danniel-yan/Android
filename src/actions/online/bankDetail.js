
import { get } from 'utils/fetch'

function request(id){
  return {
    type : 'requestOnlineBankDetail',
    id
  }
}

function receive(detail, id){
  return {
    type : 'receiveOnlineBankDetail',
    detail,
    id
  }
}

export default function fetchBankDetail(id){

  return function (dispatch, getState) {
    const state = getState();
    const detail = state.online.bankDetail;

    if(detail[id]) {
      return dispatch(receive(detail[id].detail, id));
    }

    dispatch(request())

    return get(`/bill/bank-login-elements?id=${id}`)
      .then(res => dispatch(receive(res.data, id)))
      .catch(err => {
        dispatch({type: 'requestOnlineBankDetailError', err: err});
        console.log(err)
      })
  }
}

