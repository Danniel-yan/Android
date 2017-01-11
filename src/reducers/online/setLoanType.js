const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined,
  existSuccessBill: false
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBankResult':
      return initState;
    case 'receiveBankEntryStatus':
      return Object.assign({}, state, { existSuccessBill: action.existSuccessBill})
    case 'receiveOnlineBankResult':
      return Object.assign({}, state, { isFetching: false, fetched: true, status: action.status})
    default:
      return state;
  }
}
