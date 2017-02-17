const modules = {};

import MajorNavigationContainer from './MajorNavigationContainer';
import HomeScene from './scene/HomeSceneContainer';
import FastLoanScene from './scene/FastLoanSceneContainer';
import RecLoanScene from './scene/RecLoanSceneContainer';
import CardScene from './scene/CardSceneContainer';
import ZoneScene from 'containers/scene/ZoneSceneContainer';
import Login from 'components/Login';
import LoanDetailScene from 'containers/scene/LoanDetailContainer';
import FillUserInfo from 'containers/FillUserInfo';
import ActHotListScene from 'containers/scene/card/ActHotListContainer';
import ActHotDetailScene from 'containers/scene/card/ActHotDetailContainer';
import MessagesScene from 'containers/scene/MessagesScene';
import CardListScene from 'containers/scene/card/CardListContainer'
import ContactScene from 'containers/scene/zone/ContactSceneContainer';
import SettingScene from 'containers/scene/zone/SettingSceneContainer';
import BankCardListScene from 'containers/scene/card/BankCardListContainer';
import UserInfo from 'containers/scene/zone/UserInfo';
import CardListByCategory from 'containers/scene/card/CardListByCategory';
import CardProgressList from 'containers/scene/card/CardProgressList';
import CardArticals from 'containers/scene/CardArticals';
import CardArticalDetail from 'containers/scene/CardArticalDetail';
import CertificationHome from 'containers/certification/CertificationHome';
import OnlineUserInfo from 'containers/online/UserInfo';
import OnlineCreditCards from 'containers/certification/credit/CreditCards';
import OnlineCreditCardForm from 'containers/certification/credit/CreditCardForm';
import OnlineCreditCardVerify from 'containers/certification/credit/CreditCardVerify';
import OnlineCreditCardStatus from 'containers/certification/credit/CreditCardStatus';
import OnlineYysForm from 'containers/certification/yys/YysForm';
import OnlineYysFormStatus from 'containers/certification/yys/YysFormStatus';
import OnlinePreloanSuccess from 'containers/online/PreloanSuccess';
import OnlinePreloanFailure from 'containers/online/PreloanFailure';
import OnlinePreloanExpire from 'containers/online/PreloanExpire';
import OnlineLoanForm from 'containers/online/LoanForm';
import OnlineApproveStatus from 'containers/online/ApproveStatus';
import OnlineLoanSign from 'containers/online/LoanSign';
import OnlineReceiptCard from 'containers/online/ReceiptCard';
import OnlineSignSuccess from 'containers/online/SignSuccess';
import OnlineLoanDetail from 'containers/online/LoanDetail';
import OnlineTrialRefundPlan from 'containers/online/TrialRefundPlan';

import CreditLoanHomeScene from 'containers/scene/creditLoan/Home.js';
import FundLogin from 'containers/certification/fund/FundLogin';
import BillList from 'containers/bill/BillListContainer';
import BillDetail from 'containers/bill/BillDetailContainer';
import GjjReport from 'containers/bill/GjjDetailContainer';
import GjjStatus from 'containers/certification/fund/GjjStatus';
import FindHome from 'containers/scene/find/findHome';
import AddBankCard from 'containers/scene/find/addBankCard';
import CreditReport from 'containers/scene/find/creditReport';
import BlackListhome from 'containers/blackList/Home';
import BlackListReports from 'containers/scene/find/reports'
[
  { key: 'MajorNavigation', module: MajorNavigationContainer },
  { key: 'HomeScene', module: HomeScene },
  { key: 'OnlineYysForm', module: OnlineYysForm },
  { key: 'OnlineLoanDetail', module: OnlineLoanDetail },
  { key: 'OnlineTrialRefundPlan', module: OnlineTrialRefundPlan },
  { key: 'OnlineSignSuccess', module: OnlineSignSuccess },
  { key: 'OnlineReceiptCard', module: OnlineReceiptCard },
  { key: 'OnlineLoanSign', module: OnlineLoanSign },
  { key: 'OnlineLoanForm', module: OnlineLoanForm },
  { key: 'OnlineApproveStatus', module: OnlineApproveStatus },
  { key: 'OnlineYysFormStatus', module: OnlineYysFormStatus },
  { key: 'OnlinePreloanSuccess', module: OnlinePreloanSuccess },
  { key: 'OnlinePreloanFailure', module: OnlinePreloanFailure },
  { key: 'OnlinePreloanExpire', module: OnlinePreloanExpire },
  { key: 'OnlineCreditCards', module: OnlineCreditCards },
  { key: 'CertificationHome', module: CertificationHome },
  { key: 'OnlineUserInfo', module: OnlineUserInfo },
  { key: 'OnlineCreditCardForm', module: OnlineCreditCardForm },
  { key: 'OnlineCreditCardVerify', module: OnlineCreditCardVerify },
  { key: 'OnlineCreditCardStatus', module: OnlineCreditCardStatus },
  { key: 'CardArticals', module: CardArticals },
  { key: 'CardArticalDetail', module: CardArticalDetail },
  { key: 'CardListByCategory', module: CardListByCategory },
  { key: 'CardProgressList', module: CardProgressList },
  { key: 'SettingScene', module: SettingScene },
  { key: 'ContactScene', module: ContactScene },
  { key: 'MessagesScene', module: MessagesScene},
  { key: 'LoanScene', module: FastLoanScene },
  { key: 'RecLoanScene', module: RecLoanScene },
  { key: 'CardScene', module: CardScene },
  { key: 'ZoneScene', module: ZoneScene },
  { key: 'LoanDetailScene', module: LoanDetailScene },
  { key: 'FillUserInfo', module: FillUserInfo },
  { key: 'ActHotListScene', module: ActHotListScene },
  { key: 'ActHotDetailScene', module: ActHotDetailScene },
  { key: 'CardListScene', module: CardListScene },
  { key: 'BankCardListScene', module: BankCardListScene },
  { key: 'Login', module: Login },
  { key: 'UserInfo', module: UserInfo },

  { key: 'CreditLoan', module: CreditLoanHomeScene },
  { key: 'FundLogin', module: FundLogin },
  { key: 'BillList', module: BillList },
  { key: 'BillDetail', module: BillDetail },
  { key: 'GjjReport', module: GjjReport },
  { key: 'GjjStatus', module: GjjStatus },
  { key: 'FindHome', module:  FindHome},
  { key: 'BlackListhome', module: BlackListhome},
  { key: 'AddBankCard', module: AddBankCard},
  { key: 'CreditReport', module: CreditReport},
  { key: 'BlackListReports', module: BlackListReports}
].forEach(item => {
  modules[item.key] = item.module;
});

export default modules;
