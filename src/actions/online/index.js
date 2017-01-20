import status from './status';
import banks from './banks';
import bankDetail from './bankDetail';
import submitCreditCard from './submitCreditCard';
import userInfo, { creditScore } from './userInfo';
import pickers from './pickers';
import bankResult, { bankBillList } from './bankResult';
import yysResult, { yysBillList } from './yysResult';
import yysForms from './yysForms';
import preloanStatus from './preloanStatus';
import preloan from './preloan';
import applyResult from './applyResult';
import contractBanks from './contractBanks';
import loanDetail from './loanDetail';
import gjjResult from './gjjResult';
import gjjDetail from './gjjDetail';
import gjjLoginElements from './gjjLoginElements';
import { initial, getStatus } from './pboc';

export default {
  loanDetail,
  contractBanks,
  applyResult,
  status,
  banks,
  preloan,
  preloanStatus,
  bankDetail,
  submitCreditCard,
  userInfo,
  creditScore,
  pickers,
  bankResult,
  bankBillList,
  yysResult,
  yysBillList,
  yysForms,
  gjjResult,
  setLoanType: function(loanType) {
    return { type: "SetLoanType", value: loanType };
  },
  gjjLoginElements,
  gjjDetail,
  pboc: { initial, getStatus }
}
