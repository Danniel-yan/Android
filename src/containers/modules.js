const modules = {};

import MajorNavigationContainer from './MajorNavigationContainer';
import HomeScene from './scene/HomeSceneContainer';
import FastLoanScene from './scene/FastLoanSceneContainer';
import LoanScene from './scene/LoanSceneContainer';
import CardScene from 'components/scene/CardScene';
import ZoneScene from 'components/scene/ZoneScene';
import NavigationTest from 'components/NavigationTest';
import Login from 'containers/Login';
import LoanDetailScene from 'containers/scene/LoanDetailContainer';
import FillUserInfo from 'containers/scene/FillUserInfo';

[
  { key: 'MajorNavigation', module: MajorNavigationContainer },
  { key: 'HomeScene', module: HomeScene },
  { key: 'FastLoanScene', module: FastLoanScene },
  { key: 'LoanScene', module: FastLoanScene },
  { key: 'CardScene', module: CardScene },
  { key: 'ZoneScene', module: LoanScene },
  { key: 'NavigationTest', module: LoanScene },
  { key: 'LoanDetailScene', module: LoanDetailScene },
  { key: 'FillUserInfo', module: FillUserInfo },
  { key: 'Login', module: Login }
].forEach(item => {
  modules[item.key] = item.module;
});

export default modules;
