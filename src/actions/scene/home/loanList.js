import { get } from 'utils/fetch';

export function requestLoans() {
  return {
    type: 'requestLoans'
  }
}

export function receiveLoans(response) {
  return {
    type: 'receiveLoans',
    loans: response.data
  }
}

export function fetchHomeLoans() {

  return function (dispatch) {

    dispatch(requestLoans())

    return get('/loan/index-large-list')
      .then(response => dispatch(receiveLoans(response)))
      .catch(err => console.log(err))
  }
}
