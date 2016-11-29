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

export default function login() {

  return dispatch => {
    dispatch(fetchingUser());

    get('/user/info')
      .then(response => dispatch(receiveUser(response.data)))
      .catch(console.log)
  }

}


