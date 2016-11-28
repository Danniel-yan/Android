
const initState = { isFetching : false , cardList :[]};

export default function cardList(state = initState, action ) {
  switch (action.type){
    case 'requestCardList':
      return Object.assign({}, state, { isFetching:true });
    case 'receiveCardList':
      return Object.assign({}, state, { isFetching:false, cardList: action.cardList})
    default :
      return state;
  }
}
