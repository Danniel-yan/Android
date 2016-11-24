
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHot } from 'actions/scene/card/actHot';
import ActHotListScene from 'components/scene/card/ActHotListScene';

import externalScene from 'components/high-order/externalScene';

function mapStateToProps(state){
  return state.actHot
}

function mapDispatchToProps(dispatch){
  return {
    fetching :() => dispatch(fetchActHot())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(externalScene(AsynCpGenerator(Loading, ActHotListScene)))