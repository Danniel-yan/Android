

const initState = {
  submitting: false
}

export default function fillUserInfo(state = initState, action) {
  switch(action.type) {
    case 'submittingUserInfo':
      return Object.assign({}, state, { submitting: true });
    case 'submitError':
      return Object.assign({}, state, { submitting: false, err: action.err });
    case 'receiveResponse':
      return Object.assign({}, state, { submitting: false, response: action.response });
    default: 
      return state;
  }
}
