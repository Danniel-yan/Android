const initState = { isFetching: true, fetched: false, fetchedParams: null, params:null, repayCalc:[], error: false};

export default function repayCalc(state = initState, action) {
  switch(action.type) {
    case 'requestRepayCalc':
      return Object.assign({}, state, { isFetching: true , fetched: false, error: false});
    case 'receiveRepayCalc':
      return Object.assign({}, state, { isFetching: false, fetched: true, fetchedParams: action.fetchedParams, repayCalc: action.repayCalc } )
    case 'receiveError':
      return Object.assign({}, state, { fetched: true, error: true });
    case 'fetchParamsReset':
      if(!state.fetchedParams || action.loanId !== state.fetchedParams.id) state.fetchedParams = null;
      return Object.assign({}, state);
    default:
      return state
  }
}
