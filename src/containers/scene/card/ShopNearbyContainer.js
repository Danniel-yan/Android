
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import paginationShopNearby from 'actions/scene/card/shopNearby'

import ShopNearbyScene from 'components/scene/card/ShopNearbyScene';

function mapStateToProps(state){
  return state.shopNearby
}

function mapDispatchToProps(dispatch){
  return  {
    fetching : offset => dispatch(paginationShopNearby(offset)),
    pagination: offset => dispatch(paginationShopNearby(offset))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, ShopNearbyScene))