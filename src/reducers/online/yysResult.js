const initState = {
  isFetching: true,
  fetched: false,
  status: undefined,
  err: undefined,
  yysBillFetching: true,
  existSuccessBill: false,
  billList: []
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineYysResult':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveOnlineYysResult':
      return Object.assign({}, state, { isFetching: false, fetched: true, status: action.status });
    case 'yysBillFetchStart':
      return Object.assign({}, state, { yysBillFetching: true });
    case 'receiveOnlineYysBilllList':
      var newStatus = Object.assign({}, state, { yysBillFetching: false });
      newStatus.billList = action.billList || [];
      return newStatus;
    default:
      return state;
  }
}
