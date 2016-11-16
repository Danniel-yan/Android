const modules = {};

import MajorNavigationContainer from './MajorNavigationContainer';
import HomeScene from './scene/HomeSceneContainer';
import LoanScene from './scene/LoanSceneContainer';
import CardScene from 'components/scene/CardScene';
import ZoneScene from 'components/scene/ZoneScene';
import NavigationTest from 'components/NavigationTest';

[
  { key: 'MajorNavigation', module: MajorNavigationContainer },
  { key: 'HomeScene', module: HomeScene },
  { key: 'LoanScene', module: LoanScene },
  { key: 'CardScene', module: CardScene },
  { key: 'ZoneScene', module: ZoneScene },
  { key: 'NavigationTest', module: LoanScene }
].forEach(item => {
  modules[item.key] = item.module;
});

export default modules;