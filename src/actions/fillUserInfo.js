import { post, responseStatus } from 'utils/fetch';
import alert from 'utils/alert';

function submitting() {
  return {
    type: 'submittingUserInfo'
  };
}

function submitError(err) {
  return {
    type: 'submitError',
    err
  };
}

function receiveResponse(token) {
  return {
    type: 'receiveResponse',
    token 
  };
}

export default function submitUserInfo(body) {
  return function(dispatch) {

    dispatch(submitting());

    post('/user/update-info', body)
      .then(response => {
        if(response.res = responseStatus.failre) {
          alert(response.msg);
        } else {
          AsyncStorage.setItem('userToken', response.data).then(() => {
            dispatch(receiveResponse(response.data))
          }, err => alert(err));
        }

      })
      .catch(err => dispatch(submitError(err)))
  }
}
