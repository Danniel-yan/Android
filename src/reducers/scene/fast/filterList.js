const initState = { amount: 5000, period: 12, isFetching: true, fetched: false, apply_res_list: [], result_list: [], more_list: [] };

export function filterList(state = initState, action) {
  switch(action.type) {
    case 'setAmount':
      return Object.assign({}, state, { amount: action.amount });
    case 'setLoanInfo':
      return Object.assign({}, state, { amount: action.amount, period: action.period });
    case 'fetchingStart':
      return Object.assign({}, state, { isFetching: true });
    case 'refershFetch':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveResultList':
      return Object.assign({}, state, { isFetching: false, fetched: true, result_list: action.list });
    case 'receiveMoreList':
      return Object.assign({}, state, { isFetching: false, fetched: true, more_list: action.list });
    case 'receiveApplyResList':
      return Object.assign({}, state, { isFetching: false, apply_res_list: action.list });
    default:
      return state;
  }
}
