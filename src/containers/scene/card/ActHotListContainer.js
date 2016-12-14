
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHot } from 'actions/scene/card/actHot';
import ActHotListScene from 'components/scene/card/ActHotListScene';

function mapStateToProps(state){
  return state.actHot
}

function mapDispatchToProps(dispatch){
  return {
    fetching : num => dispatch(fetchActHot( num = 20 ))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, ActHotListScene));
