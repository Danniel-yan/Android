import { connect } from 'react-redux';
import externalScene from 'components/high-order/externalScene';
import { externalPop } from 'actions/navigation';


export default function(ComponentClass, config) {

  function mapDispatchToProps(dispatch) {
    return {
      onBack: () => dispatch(externalPop(config.backCount || 1))
    };
  }
  return connect(null, mapDispatchToProps)(externalScene(ComponentClass, config));
}
