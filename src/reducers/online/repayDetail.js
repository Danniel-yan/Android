const initState = {
  isFetching: true,
  fetched: false
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineRepayDetail':
      return Object.assign({}, state, { isFetching: true, fetched: false});
    case 'receiveOnlineRepayDetail':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.detail });
    default:
      return state;
  }
}
