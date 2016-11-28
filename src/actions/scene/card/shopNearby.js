
import { get, post } from 'utils/fetch'


export default function( offset = 0) {

  return function (dispatch) {

    navigator.geolocation.getCurrentPosition(position => {

      dispatch(offset == 0 ? fetchShopNearby(offset) : paginationShopNearby(offset));

      return post('/card/shop-nearby', {
        lati: position.coords.latitude,
        long: position.coords.longitude,
        num: 10,
        offset: offset
      })
      .then(response => {
        dispatch(receiveShopNearby(response.data, offset));
      })
      .catch(err => console.log(err))
    }, err => dispatch(geoError()))

  }
}

function geoError() {
  return { type: 'geoError' }
}

function fetchShopNearby(offset) {
  return {
    type : 'fetchShopNearby',
    offset
  }
}

function paginationShopNearby(offset) {
  return {
    type : 'paginationShopNearby',
    offset
  }
}

function receiveShopNearby(shopNearby,offset){
  return {
    type : 'receiveShopNearby',
    shopNearby,
    offset: offset + shopNearby.length,
    nomore: shopNearby.length === 0
  }
}
