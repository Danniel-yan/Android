const initState = { isFetching: true, bannerList: [], adInfoList: [], loanBanner: {} };

export function indexConfig(state = initState, action) {
  switch(action.type) {
    case 'fetchingIndexConfig':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveIndexTopBanner':
      return Object.assign({}, state, { isFetching: false, bannerList: action.list });
    case 'receiveLoanAdInfo':
      return Object.assign({}, state, { isFetching: false, adInfoList: action.list });
    default:
      return state;
  }
}
