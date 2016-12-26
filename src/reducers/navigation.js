import iconHome from 'assets/tab-icons/home.png';
import iconLoan from 'assets/tab-icons/loan.png';
import iconCard from 'assets/tab-icons/card.png';
import iconZone from 'assets/tab-icons/zone.png';

import iconHomeActive from 'assets/tab-icons/home_active.png';
import iconLoanActive from 'assets/tab-icons/loan_active.png';
import iconCardActive from 'assets/tab-icons/card_active.png';
import iconZoneActive from 'assets/tab-icons/zone_active.png';

import { NavigationExperimental } from 'react-native';
const { StateUtils: NavigationStateUtils } = NavigationExperimental;

const majorNavigationIndex = 0;

const initState = {
  index: 0,
  routes: [{
    key: 'MajorNavigation',
    curTab: 'HomeScene',
    index: 0,

    HomeScene: {
      index: 0,
      isActive: true,
      routes: [{ key: 'HomeScene'}],
      text: '首页',
      icon: iconHome,
      activeIcon: iconHomeActive
    },

    LoanScene: {
      index: 0,
      routes: [{ key: 'LoanScene'}],
      text: '贷款',
      icon: iconLoan,
      activeIcon: iconLoanActive
    },

    CardScene: {
      index: 0,
      routes: [{ key: 'CardScene'}],
      text: '办卡',
      icon: iconCard,
      activeIcon: iconCardActive
    },

    ZoneScene: {
      index: 0,
      routes: [{ key: 'ZoneScene'}],
      text: '我的',
      icon: iconZone,
      activeIcon: iconZoneActive
    },
  }],
  tabs: [{
    text: '首页',
    icon: iconHome,
    activeIcon: iconHomeActive,
    sceneKey: 'HomeScene'
  }, {
    text: '贷款',
    icon: iconLoan,
    activeIcon: iconLoanActive,
    sceneKey: 'LoanScene'
  }, {
    text: '办卡',
    icon: iconCard,
    activeIcon: iconCardActive,
    sceneKey: 'CardScene'
  }, {
    text: '我的',
    icon: iconZone,
    activeIcon: iconZoneActive,
    sceneKey: 'ZoneScene'
  }]
};


export default function navigation(state = initState, action) {
  switch(action.type) {
    case 'externalPush':
      return NavigationStateUtils.push(state, action.route);
    case 'externalPop':
      if (state.index <= 0) {
        return state;
      }

      let bankCount = action.bankCount || 1;
      let routes = state.routes;

      if(action.key) {
        let toIndex = routes.findIndex(route => route.key == action.key);
        bankCount = routes.length - toIndex + 1;
      }

      routes = routes.slice(0, routes.length - bankCount);

      return {
        ...state,
        index: routes.length - 1,
        routes
      };
    case 'externalReplace':
      return NavigationStateUtils.replaceAtIndex(state, state.routes.length - 1,action.route);
    case 'externalJumpTo':
      return NavigationStateUtils.jumpTo(state, action.key);
    case 'externalJumpToIndex':
      return NavigationStateUtils.jumpToIndex(state, action.index);
    case 'majorPush':
      return majorPush(state, action.route);
    case 'majorPop':
      return majorPop(state);
    case 'majorTab':
      return majorTab(state, action.tabName);
    default:
      return state;
  }
}

function majorPush(state, route) {
  let major = state.routes[majorNavigationIndex];
  let { curTab } = major;

  let scene = major[curTab];
  let newScene = NavigationStateUtils.push(scene, route);

  major = {
    ...major,
    [curTab]: newScene,
  };

  return updateMajor(state, major);
}

function majorPop(state, route) {
  let major = state.routes[majorNavigationIndex];
  let { curTab } = major;

  let scene = major[curTab];
  let newScene = NavigationStateUtils.pop(scene);

  major = {
    ...major,
    [curTab]: newScene
  };

  return updateMajor(state, major);
}

function majorTab(state, tabName) {
  let major = state.routes[majorNavigationIndex];
  let curTab = major.curTab;

  if(curTab == tabName) {
    return state;
  }

  let curScene = major[curTab];
  let nextScene = major[tabName];

  curScene = {
    ...curScene,
    isActive: false
  };

  nextScene = {
    ...nextScene,
    isActive: true
  };


  major = {
    ...major,
    curTab: tabName,
    [curTab]: curScene,
    [tabName]: nextScene
  };

  return updateMajor(state, major);
}

function updateMajor(state, major) {
  return {
    ...state,
    routes: [
      major,
      ...state.routes.slice(1)
    ]
  }
}
