import { connect } from 'react-redux';

import addBankCard from 'components/find/addBankCard';
import { AddCard, SelectCard } from 'actions/blackList';
import { externalPop } from 'actions/navigation';

// function mapStateToProps(state) {
//
// }

function mapDispatchToProps(dispatch) {
  return {
    addBankCard: card => {dispatch(AddCard(card)); dispatch(SelectCard(card));},
    externalPop: () => dispatch(externalPop())
  };
}


export default connect(null, mapDispatchToProps)(addBankCard);
