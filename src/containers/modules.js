const modules = {};

import MajorNavigationContainer from './MajorNavigationContainer';
import HomeScene from './scene/HomeSceneContainer';
import FastLoanScene from './scene/FastLoanSceneContainer';
import RecLoanScene from './scene/RecLoanSceneContainer';
import CardScene from './scene/CardSceneContainer';
import ZoneScene from 'containers/scene/ZoneSceneContainer';
import Login from 'containers/Login';
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

[
  { key: 'MajorNavigation', module: MajorNavigationContainer },
  { key: 'HomeScene', module: HomeScene },
  { key: 'CardListByCategory', module: CardListByCategory },
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
  { key: 'UserInfo', module: UserInfo }
].forEach(item => {
  modules[item.key] = item.module;
});

export default modules;
