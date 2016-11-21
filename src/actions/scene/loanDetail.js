
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

export function fetchLoanDetail(id) {

  return function (dispatch) {

    dispatch(requestLoanDetail())

    return fetch(`loanDetail.json?id=` + id )
      .then(response => response.json())
      .then(detail => dispatch(receiveLoanDetail(detail)))
      .catch(err => console.log(err))
  }
}
