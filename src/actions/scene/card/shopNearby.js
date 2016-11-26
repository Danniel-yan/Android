
import { get, post } from 'utils/fetch'

export function requestShopNearby(){
  return {
    type : 'requestShopNearby'
  }
}

export function receiveShopNearby(response, offset){
  return {
    type : 'receiveShopNearby',
    shopNearby: response.data,
    offset
  }
}

export function fetchShopNearby(offset = 0){

  return function (dispatch) {

    dispatch(requestShopNearby())

    navigator.geolocation.getCurrentPosition(
      (position) => {
        return post('/card/shop-nearby',{ lati: position.coords.latitude , long : position.coords.longitude, num: 5, offset : offset })
          .then(response => {
            dispatch(receiveShopNearby(response, offset));
          })
          .catch(err => console.log(err))
      }
    )

  }
}