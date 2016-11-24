const initState = { isFetching: false, bannerList: [] };

export default function actHot(state = initState, action) {
  switch(action.type) {
    case 'requestActHot':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveActHot':
      return Object.assign({}, state, { isFetching: false, bannerList: action.bannerList } )
    default:
      return state
  }
}
