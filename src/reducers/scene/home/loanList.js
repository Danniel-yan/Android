const initState = { isFetching: false, fetched: false, loans: [] };

export default function homeLoanList(state = initState, action) {
  switch(action.type) {
    case 'requestLoans':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveLoans':
      return Object.assign({}, state, { isFetching: false, fetched: true, loans: action.loans } )
    default:
      return state
  }
}
