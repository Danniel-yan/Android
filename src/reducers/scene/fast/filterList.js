const initState = { amount: 5000, isFetching: true, result_list: [], more_list: [] };

export function filterList(state = initState, action) {
  switch(action.type) {
    case 'setAmount':
      return Object.assign({}, state, { amount: action.amount });
    case 'fetchingStart':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveResultList':
      return Object.assign({}, state, { isFetching: false, result_list: action.list });
    case 'receiveMoreList':
      return Object.assign({}, state, { isFetching: false, more_list: action.list });
    default:
      return state;
  }
}
