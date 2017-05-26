const initState = {
  isFetching: true,
  fetched: false
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineDepositoryCreate':
      return Object.assign({}, state, { isFetching: true, fetched: false});
    case 'receiveOnlineDepositoryCreate':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.detail });
    default:
      return state;
  }
}
