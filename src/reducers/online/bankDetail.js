const initState = {
  isFetching: false,
  fetched: false,
  err: null,
  details: {}
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBankDetail':
      // return Object.assign({}, state, { [action.id]: {isFetching: true, fetched: false} })
      var newState = Object.assign({}, state);
      newState[action.id] = {isFetching: true, fetched: false};
      return newState;
    case 'receiveOnlineBankDetail':
      var newState = Object.assign({}, state);
      newState[action.id] = {isFetching: false, fetched: true, detail: action.detail};
      return newState;
      // return Object.assign({}, state, { [action.id]: {isFetching: false, fetched: true, detail: action.detail} })
    case 'requestOnlineBankDetailError':
      // return Object.assign({}, state, { [action.id]: {isFetching: false, fetched: false, err: action.err} })
      var newState = Object.assign({}, state);
      newState[action.id] = {isFetching: false, fetched: false, err: action.err};
      return newState;
    default:
      return state;
  }
}
