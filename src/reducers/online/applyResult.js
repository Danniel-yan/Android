const initState = {
  isFetching: true,
  fetched: false,
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineApproveResult':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveOnlineApproveResult':
      return Object.assign({}, state, { isFetching: false, fetched: true, ...action.result});
    default:
      return state;
  }
}
