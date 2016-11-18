const initState = { isFetching: false, loans: [] };

export default function homeLoanList(state = initState, action) {
  switch(action.type) {
    case 'requestLoans':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveLoans':
      return Object.assign({}, state, { isFetching: false, loans: action.loans } )
    default:
      return state
  }
}
