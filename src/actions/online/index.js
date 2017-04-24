import status from './status';
import banks from './banks';
import bankDetail from './bankDetail';
import bankInfo from './bankInfo';
import repayDetail from './repayDetail';
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
import repayAmount from './repayAmount';
import gjjResult from './gjjResult';
import gjjDetail from './gjjDetail';
import gjjLoginElements from './gjjLoginElements';
import depositoryCreate from './depositoryCreate';
import depositoryResult from './depositoryResult';
import repayRecharge from './repayRecharge';
import { initial, getStatus } from './pboc';

export default {
  loanDetail,
  bankInfo,
  repayAmount,
  repayDetail,
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
  depositoryCreate,
  depositoryResult,
  repayRecharge,
  setLoanType: function(loanType) {
    return { type: "SetLoanType", value: loanType };
  },
  gjjLoginElements,
  gjjDetail,
  pboc: { initial, getStatus }
}
