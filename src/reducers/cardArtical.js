import { fetchCardArticalDetail, fetchCardArticals } from 'actions/cardArtical';

const articals = {
  isFetching: true,
  fetched: false,
  articals: [],
  err: null,
  details: {}
};

export default function cardArticals(state = articals, action) {
  switch(action.type) {
    case 'requestCardArticals':
      return Object.assign({}, state, { isFetching: true, fetched: false });
    case 'receiveCardArticals':
      return Object.assign({}, state, { isFetching: false, fetched: true, articals: action.articals });
    case 'requestCardArticalsError':
      return Object.assign({}, state, { isFetching: false, fetched: false, err: action.err });

    case 'requestCardArticalDetail':
    case 'receiveCardArticalDetail':
    case 'requestCardArticalDetailError':
      return Object.assign({}, state, { details: articalDetail(state.details, action)});
    default: 
      return state;
      
  }
}

function articalDetail(state, action) {
  switch(action.type) {
    case 'requestCardArticalDetail':
      return Object.assign({}, state, { [action.id]: {isFetching: true, fetched: false} })
    case 'receiveCardArticalDetail':
      return Object.assign({}, state, { [action.id]: {isFetching: false, fetched: true, detail: action.detail} })
    case 'requestCardArticalDetailError':
      return Object.assign({}, state, { [action.id]: {isFetching: false, fetched: false, err: action.err} })
    default: 
      return state;
  }
}
