import { connect } from 'react-redux';

import ExternalNavigation from 'components/ExternalNavigation';
import { externalPop } from 'actions/navigation'

function mapStateToProps(state) {
  return { navigation: state.navigation };
}

function mapDispatchToProps(dispatch) {
  return {
    externalPop: () => dispatch(externalPop())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalNavigation);
