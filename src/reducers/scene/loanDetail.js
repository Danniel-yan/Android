const initState = {
  isFetching: true,
  fetchedParams: undefined,
  detail: {},
  fetched: false
};

export default function loanDetail(state = initState, action) {
  switch(action.type) {
    case 'requestLoanDetail':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveLoanDetail':
      return Object.assign({}, state, { isFetching: false, fetched: true, fetchedParams: action.fetchedParams, detail: action.detail } )
    default:
      return state
  }
}
