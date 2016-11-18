const initState = { isFetching: false, recommends: [] };

export default function homeRecomendList(state = initState, action) {
  switch(action.type) {
    case 'requestRecommends':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveRecommends':
      return Object.assign({}, state, { isFetching: false, recommends: action.recommends } )
    default:
      return state
  }
}
