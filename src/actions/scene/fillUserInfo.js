import { post } from 'utils/fetch';
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

function receiveResponse(response) {
  return {
    type: 'receiveResponse',
    response 
  };
}

export default function submitUserInfo(body) {
  return function(dispatch) {

    dispatch(submitting());

    post('/user/update-info', body)
      .then(response => dispatch(receiveResponse(response)))
      .catch(err => dispatch(submitError(err)))
  }
}
