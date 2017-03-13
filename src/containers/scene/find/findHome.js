import { connect } from 'react-redux';

import findHome from 'components/find/findHome';
import { trackingScene } from 'high-order/trackingPointGenerator';
import pboc from 'actions/pboc';
import { externalPush } from 'actions/navigation';
import { CertificationEntry } from 'high-order/Certification';

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pboc: params => dispatch(pboc(params)),
    externalPush: route => dispatch(externalPush(route)),
    setLoanType: () => dispatch({ type: "SetLoanType", value: 0 })
  }
}

export default CertificationEntry(connect(mapStateToProps,mapDispatchToProps)(trackingScene(findHome)));
