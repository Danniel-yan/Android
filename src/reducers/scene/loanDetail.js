const initState = {
  isFetching: false,
  fetched: false,
  fetchedParams: undefined,
  detail: {}
};

export default function loanDetail(state = initState, action) {
  switch(action.type) {
    case 'requestLoanDetail':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveLoanDetail':
      return Object.assign({}, state, { isFetching: false, fetched: true, fetchedParams: action.fetchedParams, detail: action.detail } )
    default:
      return state
  }
}
