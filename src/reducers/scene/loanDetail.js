const initState = { isFetching: false, detail: {} };

export default function loanDetail(state = initState, action) {
  switch(action.type) {
    case 'requestLoanDetail':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveLoanDetail':
      return Object.assign({}, state, { isFetching: false, detail: action.detail } )
    default:
      return state
  }
}
