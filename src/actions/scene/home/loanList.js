//import fetch from 'isomorphic-fetch';

export function requestLoans() {
  return {
    type: 'requestLoans'
  }
}

export function receiveLoans(loans) {
  return {
    type: 'receiveLoans',
    loans: loans
  }
}

export function fetchHomeLoans() {

  return function (dispatch) {

    dispatch(requestLoans())

    return fetch(`recommend.json`)
      .then(response => response.json())
      .then(loans => dispatch(receiveLoans(loans)))
      .catch(err => console.log(err))
  }
}
