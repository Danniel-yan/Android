
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import { fetchShopNearby } from 'actions/scene/card/shopNearby'

import ShopNearbyScene from 'components/scene/card/ShopNearbyScene';

function mapStateToProps(state){
  return state.shopNearby
}

function mapDispatchToProps(dispatch){
  return  {
    fetching : () => dispatch(fetchShopNearby())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, ShopNearbyScene))