import { AsyncStorage } from 'react-native';
import { get } from 'utils/fetch';

function fetchingUser() {
  return {
    type: 'fetchingUser'
  };
}

function receiveUser(info) {
  return {
    type: 'receiveUser',
    info
  };
}

export default function() {

  return dispatch => {
    dispatch(fetchingUser());

    get('/user/info')
      .then(response => dispatch(receiveUser(response.data)))
      .catch(console.log)
  }
}

export function logout() {
  return dispatch => {
    dispatch({type: 'logouting'});

    AsyncStorage.removeItem('userToken').then(() => {
      dispatch({type: 'logouted'});
    })
  }
}
