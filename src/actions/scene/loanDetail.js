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

export function goLoan(url, title) {
  return function(dispatch) {
    AsyncStorage.getItem('userToken').then(token => {
      if(token == null) {
        dispatch(externalPush({ key: 'FillUserInfo' }))
      } else {
        dispatch(externalPush({ key: url, title, web: url }))
      }
    })
  }
}
