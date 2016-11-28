
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';
import { externalPush } from 'actions/navigation';

import { fetchActDetailBanner } from 'actions/scene/card/actDetailBanner';
import ActDetailBannerScene from 'components/scene/card/ActDetailBannerScene';

function mapStateToProps(state) {
  return state.actDetailBanner;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchActDetailBanner()),
    externalPushToWeb: (url) => dispatch(externalPush({key: url, web: url}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActDetailBannerScene));
