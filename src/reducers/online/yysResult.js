const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined,
  existSuccessBill: false
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineYysResult':
      return initState;
    case 'receiveYYSEntryStatus':
      return Object.assign({}, state, { existSuccessBill: action.existSuccessBill});
    case 'receiveOnlineYysResult':
      return Object.assign({}, state, { isFetching: false, fetched: true });
    default:
      return state;
  }
}
