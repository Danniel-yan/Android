const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined,
  existSuccessBill: false,
  bankBillFetching: false,
  billList: []
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineBankResult':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveOnlineBankResult':
      var newStatus = Object.assign({}, state, { isFetching: false, fetched: true, status: action.status });
      return newStatus;
    case 'bankBillFetchStart':
      return Object.assign({}, state, { bankBillFetching: true });
    case 'receiveOnlineBankBilllList':
      var newStatus = Object.assign({}, state, { bankBillFetching: false });
      newStatus.billList = action.billList || [];
      return newStatus;
    default:
      return state;
  }
}
