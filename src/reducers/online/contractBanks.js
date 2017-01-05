const initState = {
  isFetching: true,
  fetched: false,
  banks: []
};

export default function(state = initState, action) {
  switch(action.type) {
    case 'requestOnlineContractBanks':
      return initState;
    case 'receiveOnlineContractBanks':
      return Object.assign({}, state, { isFetching: false, fetched: true, banks: action.banks})
    default: 
      return state;
  }
}

