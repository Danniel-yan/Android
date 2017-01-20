const initState = {
  isFetching: true,
  fetched: false,
  err: null,
  detail: null
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestGjjDetail':
      var newState = Object.assign({}, state, { isFetching: true, fetched: false });
      newState.err = null; newState.detail = null;
      return newState;
    case 'receiveGjjDetail':
      var newState = Object.assign({}, state, { isFetching: false, fetched: true, detail: action.detail });
      newState.err = action.error;
      return newState;
    default:
      return state;
  }
}
