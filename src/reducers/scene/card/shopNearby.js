const initState = { isFetching : false , shopNearby : [] }

export default function shopNearby(state = initState , action){
  switch (action.type){
    case 'requestShopNearby':
      return Object.assign({}, state, { isFetching: true });
    case 'receiveShopNearby':
      return Object.assign({}, state, { isFetching: false, shopNearby : action.shopNearby });
    default :
      return state;
  }
}