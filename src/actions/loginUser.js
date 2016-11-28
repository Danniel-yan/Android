
function fetchingUser() {
  return {
    type: 'fetchingUser'
  };
}

function receiveUser(user) {
  return {
    type: 'receiveUser',
    user
  };
}

export default function login() {

  return dispatch => {
    dispatch(submitting());

    get('/user/info')
      .then(response => dispatch(receiveUser(response.data)))
      .catch(err => { alert('网络异常'); })
  }

}


