const initState = { isFetching: false, recommends: [] };

export default function fastLoanRecommendList(state = initState, action) {
  switch(action.type) {
    case 'requestFastLoanRecommends':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveFastLoanRecommends':
      return Object.assign({}, state, { isFetching: false, recommends: action.recommends } )
    default:
      return state
  }
}
