const initState = {
  submitting: false,
  result: {},
  submitted: false,
  err: null
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'submittingOnlineCreditCard':
      return Object.assign({}, state, { submitting: true, result: {} });
    case 'submitOnlineCreditCardError':
      return Object.assign({}, state, { submitting: false, result: {}, err: action.err });
    case 'submitOnlineCreditCardSuccess':
      return Object.assign({}, state, { submitting: false, err: null, result: action.result});
    default:
      return state;
  }
}
