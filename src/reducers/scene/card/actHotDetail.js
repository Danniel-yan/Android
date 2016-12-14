const initState = { isFetching: true, fetched: false, detail: {} };

export default function actHotDetail(state = initState, action) {
  switch(action.type) {
    case 'requestActHotDetail':
      return Object.assign({}, state, { isFetching: true , fetched: false });
    case 'receiveActHotDetail':
      return Object.assign({}, state, { isFetching: false, fetchedParams: action.fetchedParams, fetched: true, detail: action.detail } )
    default:
      return state
  }
}
