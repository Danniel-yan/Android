const initState = { isFetching: true, fetched: false, fetchedParams: null, repayCalc:[]};

export default function repayCalc(state = initState, action) {
  switch(action.type) {
    case 'requestRepayCalc':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveRepayCalc':
      return Object.assign({}, state, { isFetching: false, fetched: true, fetchedParams: action.fetchedParams, repayCalc: action.repayCalc } )
    default:
      return state
  }
}