
import { get } from 'utils/fetch'

export function requestCardArticals(){
  return {
    type : 'requestCardArticals'
  }
}

export function receiveCardArticals(articals){
  return {
    type : 'receiveCardArticals',
    articals
  }
}

export function fetchCardArticals(){

  return function (dispatch){

    dispatch(requestCardArticals())

    return get(`/card/info-list`)
      .then(infoList => dispatch(receiveCardArticals(infoList.data)))
      .catch(err => {
        dispatch({type: 'requestCardArticalsError', err: err});
        console.log(err)
      })

  }
}


export function fetchCardArticalDetail(id) {

  return function (dispatch, getState) {
    const state = getState();
    const details = state.cardArtical.details;

    if(details[id]) {
      return dispatch({type: 'receiveCardArticalDetail', id, detail: details[id].detail});
    }

    dispatch({type: 'requestCardArticalDetail', id})

    return get(`/card/info-detail?id=${id}`)
      .then(detail => dispatch({type: 'receiveCardArticalDetail', id, detail: detail.data}))
      .catch(err => {
        dispatch({type: 'requestCardArticalDetailError', id, err: err});
        console.log(err);
      })

  }
}
