import { connect } from 'react-redux';
import externalScene from 'components/high-order/externalScene';
import { externalPop } from 'actions/navigation';

function mapDispatchToProps(dispatch) {
  return {
    onBack: () => dispatch(externalPop())
  };
}

export default function(ComponentClass, title) {
  return connect(null, mapDispatchToProps)(externalScene(ComponentClass, title));
}
