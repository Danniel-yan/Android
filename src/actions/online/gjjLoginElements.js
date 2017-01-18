
import { get } from 'utils/fetch'

function request(){
  return {
    type : 'requestGjjLoginElements'
  }
}

function receive(loginEles){
  return {
    type : 'receiveGjjLoginElements',
    loginEles
  }
}

export default function fetchGjjLoginElements(){

  return (dispatch) => {

    dispatch(request())

    return get(`/bill/gjj-login-elements`)
      .then(res => dispatch(receive(res.data)))
      .catch(err => {
        dispatch({type: 'receiveGjjLoginElementsError', err: err});
        console.log(err)
      })
  }
}
