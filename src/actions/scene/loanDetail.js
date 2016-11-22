import { AsyncStorage } from 'react-native';
import { externalPush } from 'actions/navigation';

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

export function goLoan(url) {
  return function(dispatch) {
    AsyncStorage.getItem('userToken').then(token => {
      if(token == null) {
        dispatch(externalPush({ key: 'FillUserInfo' }))
      } else {
        dispatch(externalPush({ web: 'https://m.madailicai.com' }))
      }
    })
  }
}
