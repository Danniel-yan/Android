import { get , post } from 'utils/fetch'

export function requestGjjSecondLogin(){
  return {
    type : 'requestGjjSecondLogin'
  }
}

export function receiveGjjSecondLogin(){
  return {
    type : 'receiveGjjSecondLogin'
  }
}

export function fetchGjjSecondLogin(body){

  return function(dispatch){

    dispatch(requestGjjSecondLogin())

    return post(`/bill/gjj-second-login`, body)
      .then(response => {
        if(response.res == responseStatus.success) {
          dispatch(receiveGjjSecondLogin(response.data));
        }
      })
      .catch( err => console.log(err))
  }

}