const initState = {
  isFetching: true,
  fetchedParams: undefined,
  detail: {}
};

export default function loanDetail(state = initState, action) {
  switch(action.type) {
    case 'requestLoanDetail':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveLoanDetail':
      return Object.assign({}, state, { isFetching: false, fetchedParams: action.fetchedParams, detail: action.detail } )
    default:
      return state
  }
}
