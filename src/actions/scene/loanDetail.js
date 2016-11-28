import { AsyncStorage } from 'react-native';
import { externalPush } from 'actions/navigation';
import { get } from 'utils/fetch';

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

    get(`/loan/info-detail?id=${id}`)
      .then(response => dispatch(receiveLoanDetail(response.data)))
      .catch(err => console.log(err))
  }
}
