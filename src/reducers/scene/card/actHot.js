const initState = { isFetching: false, actHot: [] };

export default function actHot(state = initState, action) {
  switch(action.type) {
    case 'requestActHot':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveActHot':
      return Object.assign({}, state, { isFetching: false, actHot: action.actHot } )
    default:
      return state
  }
}
