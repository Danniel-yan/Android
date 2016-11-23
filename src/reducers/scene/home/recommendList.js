const initState = { isFetching: false, fetched: false, recommends: [] };

export default function homeRecomendList(state = initState, action) {
  switch(action.type) {
    case 'requestRecommends':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveRecommends':
      return Object.assign({}, state, { isFetching: false, fetched: true, offset: action.offset, recommends: action.recommends } )
    default:
      return state
  }
}
