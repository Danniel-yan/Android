const initState = {
  isFetching: true,
  fetched: false,
  err: null,
  elements: []
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestGjjLoginElements':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveGjjLoginElements':
      return Object.assign({}, state, { isFetching: false, fetched: true, elements: action.loginEles });
    case 'receiveGjjLoginElementsError':
      return Object.assign({}, state, { isFetching: false, fetched: false, err: action.err });
    default:
      return state;
  }

}
