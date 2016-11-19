
require('mock');

export function requestLoanDetail() {
  return {
    type: 'requestLoanDetail'
  }
}

export function receiveLoanDetail(detail) {
  return {
    type: 'receiveLoanDetail',
    detail: detail
  }
}

export function fetchLoanDetail() {

  return function (dispatch) {

    dispatch(requestLoanDetail())

    return fetch(`loanDetail.json`)
      .then(response => response.json())
      .then(detail => dispatch(receiveLoanDetail(detail)))
      .catch(err => console.log(err))
  }
}
