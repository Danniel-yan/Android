const initState = { isFetching: false, bannerImg:{} };

export default function actDetailBanner(state = initState, action) {
  switch(action.type) {
    case 'requestActDetailBanner':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveActDetailBanner':
      return Object.assign({}, state, { isFetching: false, bannerImg: action.bannerImg });
    default:
      return state
  }
}