const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined,
  existSuccessBill: false,
  billList: []
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBankResult':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveBankEntryStatus':
      return Object.assign({}, state, { existSuccessBill: action.existSuccessBill})
    case 'receiveOnlineBankResult':
      var newStatus = Object.assign({}, state, { isFetching: false, fetched: true, status: action.status });
      newStatus.billList = action.billList || [];
      return newStatus;
    default:
      return state;
  }
}
