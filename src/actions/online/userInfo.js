import { get, post, responseStatus } from 'utils/fetch';

export default function requestUser() {

  return dispatch => {

    dispatch({type: 'requetOnlineUser'});

    return get('/loanctcf/first-filter-status').then(response => {
      if(response.res == responseStatus.success) {
        dispatch({type: 'receiveOnlineUser', user: response.data})
      } else {
        dispatch({type: 'receiveOnlineUserError' })
      }
    }).catch(err => {
      dispatch({type: 'requestOnlineUserError' })
    })
  }
}

