const initState = {
  isFetching: true,
  fetched: false,
}

export default function iosConfig(state = initState, action) {
  switch(action.type) {
    case 'startFetching':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'endFetching':
      return Object.assign({}, state, { isFetching: false, fetched: true });
    case 'receiveIOSConfig':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
