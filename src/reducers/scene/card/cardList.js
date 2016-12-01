
const initState = {
  isPaging: false,
  paginationParams: {},
  isFetching : false ,
  cardList :[],
  fetched: false,
  fetchedParams: {},
  nomore: false
};

export default function cardList(state = initState, action ) {
  switch (action.type){
    case 'fetchCardList':
      return Object.assign({}, state, { isFetching:true });
    case 'paginationCardList':
      return Object.assign({}, state, { isPaging:true })
    case 'receiveCardList':
      return Object.assign({}, state, {
        isFetching:false,
        isPaging: false,
        fetched: true,
        fetchedParams: action.fetchedParams,
        cardList: state.isPaging ? [...state.cardList,...action.cardList] : [...action.cardList],
        paginationParams:action.params,
        nomore: action.nomore
      })
    default :
      return state;
  }
}
