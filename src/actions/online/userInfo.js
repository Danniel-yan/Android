import { AsyncStorage } from 'react-native';
import { get, post, responseStatus } from 'utils/fetch';

export default function requestUser() {

  return dispatch => {

    dispatch({type: 'requetOnlineUser'});

    AsyncStorage.getItem("loan_type").then(type => {
      return post('/loanctcf/first-filter-status', type ? { loan_type: type } : {}).then(response => {
        if(response.res == responseStatus.success) {
          dispatch({type: 'receiveOnlineUser', user: response.data})
        } else {
          dispatch({type: 'receiveOnlineUserError' })
        }
      }).catch(err => {
        dispatch({type: 'requestOnlineUserError' })
      })
    });


  }
}
