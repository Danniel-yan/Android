import { combineReducers } from 'redux';
import status from './status';
import banks from './banks';
import bankDetail from './bankDetail';
import submitCreditCard from './submitCreditCard';
import userInfo from './userInfo';
import pickers from './pickers';
import bankResult from './bankResult';
import yysResult from './yysResult';
import yysForms from './yysForms';
import preloanStatus from './preloanStatus';
import preloan from './preloan';
import applyResult from './applyResult';
import contractBanks from './contractBanks';
import loanDetail from './loanDetail';

export default combineReducers({
  loanDetail,
  contractBanks,
  status,
  applyResult,
  preloanStatus,
  preloan,
  banks,
  bankDetail,
  submitCreditCard,
  userInfo,
  pickers,
  bankResult,
  yysResult,
  yysForms,
  loanType: function(state, action) {
    switch(action.type) {
      case "setLoanType":
        return action.value || 1;
      default:
        return 1;
    }
  }
})
