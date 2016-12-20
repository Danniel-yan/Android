
const initState = {
  isFetching: false,
  fetched: false,
  err: null,
  config: {}
};

export default (state = initState, action) => {
  switch(action.type) {
    case 'fetchingCardConfig':
      return {isFetching: true, fetched: false, err: null};
    case 'fetchError':
      return {isFetching: false, fetched: false, err: action.err};
    case 'receiveCardConfig':
      return {isFetching: false, fetched: true, err: null, config: action.config};
    default: 
      return state;
  }
}
