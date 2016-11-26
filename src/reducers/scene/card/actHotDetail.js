const initState = { isFetching: false, detail: {} };

export default function actHotDetail(state = initState, action) {
  switch(action.type) {
    case 'requestActHotDetail':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveActHotDetail':
      return Object.assign({}, state, { isFetching: false, detail: action.detail } )
    default:
      return state
  }
}
