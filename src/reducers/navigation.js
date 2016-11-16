
import { NavigationExperimental } from 'react-native';
const { StateUtils: NavigationStateUtils } = NavigationExperimental;

const majorNavigationIndex = 0;

const initState = {
  index: 0,
  routes: [{
    key: 'MajorNavigation',
    curTab: 'HomeScene',
    
    HomeScene: {
      index: 0,
      isActive: true,
      routes: [{ key: 'HomeScene'}]
    },

    LoanScene: {
      index: 0,
      routes: [{ key: 'LoanScene'}]
    },

    CardScene: {
      index: 0,
      routes: [{ key: 'CardScene'}]
    },

    ZoneScene: {
      index: 0,
      routes: [{ key: 'ZoneScene'}]
    },
  }]
};


export default function navigation(state = initState, action) {
  switch(action.type) {
    case 'externalPush':
      let aa = NavigationStateUtils.push(state, action.route);
      console.log(aa);
      return aa;
    case 'externalPop':
      return NavigationStateUtils.pop(state);
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
    [nextScene]: nextScene
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
