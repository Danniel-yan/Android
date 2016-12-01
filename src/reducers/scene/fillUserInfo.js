
const initState = {
  submitting: false,
  submitSuccess: false
}

export default function fillUserInfo(state = initState, action) {
  switch(action.type) {
    case 'submittingUserInfo':
      return Object.assign({}, state, { submitting: true, submitSuccess: false});
    case 'submitError':
      return Object.assign({}, state, { submitting: false, submitSuccess: false, err: action.err });
    case 'receiveResponse':
      return Object.assign({}, state, { submitting: false, token: action.token, submitSuccess: true });
    default:
      return state;
  }
}