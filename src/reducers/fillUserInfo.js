

const initState = {
  submitting: false
}

export default function fillUserInfo(state = initState, action) {
  switch(action.type) {
    case 'submittingUserInfo':
      return Object.assign({}, state, { submitting: true, token: undefined });
    case 'submitError':
      return Object.assign({}, state, { submitting: false, token: undefined, err: action.err });
    case 'receiveResponse':
      return Object.assign({}, state, { submitting: false, token: action.token });
    default: 
      return state;
  }
}
