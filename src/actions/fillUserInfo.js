import { AsyncStorage } from 'react-native';
import { post, responseStatus } from 'utils/fetch';
import fetchUser from './loginUser';
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

export default function submitUserInfo(body, successCallBack) {
  return function(dispatch) {

    dispatch(submitting());

    post('/user/update-info', body)
      .then(response => {

        if(response.res === responseStatus.success) {
          var token = response.data ? response.data.token : null
          token && AsyncStorage.setItem('userToken', token).then(() => {
            dispatch(receiveResponse(token))
            dispatch(fetchUser());
            successCallBack && successCallBack();
          }, err => alert(err));
        } else {
          alert(response.msg);
          dispatch(submitError(response.msg));
        }

      })
      .catch(err => dispatch(submitError(err)))
  }
}
