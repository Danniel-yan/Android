

import { NavigationExperimental } from 'react-native';
const { StateUtils: NavigationStateUtils } = NavigationExperimental;

const iconHome = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_1-nor.gif';
const iconLoan = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_2-nor.gif';
const iconCard = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_3-nor.gif';
const iconZone = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_4-nor.gif';

const iconHomeActive = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_1-light.gif';
const iconLoanActive = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_2-light.gif';
const iconCardActive = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_3-light.gif';
const iconZoneActive = 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/bottom_icon_4-light.gif';

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
      isLarge : true,
      icon: iconLoan,
      activeIcon: iconLoanActive
    },

    CardScene: {
      index: 0,
      routes: [{ key: 'FindHome'}],
      text: '发现',
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
    text: '发现',
    icon: iconCard,
    activeIcon: iconCardActive,
    sceneKey: 'FindHome'
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
      //return NavigationStateUtils.push(state, action.route);
    case 'externalPop':

      const routes = state.routes;
      const route = action.route;

      if(!route) { return pop(state); }

      let { key, component, web } = route;

        // 指定component及web直接push
      if(component || web) {
        route.key = route.key || Math.random().toString();
        return NavigationStateUtils.push(state, route);
      }

      let popToRouteIndex = -1;

      if(key) {
        popToRouteIndex = routes.findIndex(route => route.key == key);

        // 不存在的route，进行push
        if(popToRouteIndex == -1) {
          return NavigationStateUtils.push(state, route);
        }

        popToRouteIndex += 1;
      }

      // pop操作
      if(routes.length == 1) {
        return state;
      }

      return popToIndex(state, popToRouteIndex, route);

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

function pop(state) {
  const routes = state.routes;
  const lastestRoute = routes[routes.length - 1];
  const backRoute = lastestRoute.backRoute;

  let popToRouteIndex = -1;

  if(backRoute) {
    return popToRoute(state, backRoute);
  }

  return popToIndex(state, popToRouteIndex);
}

function popToRoute(state, backRoute) {
  let popToRouteIndex = -backRoute.backCount;

  if(backRoute.key) {
    popToRouteIndex = 1 + state.routes.findIndex(route => route.key == backRoute.key);
  }

  return popToIndex(state, popToRouteIndex, backRoute);
}

function popToIndex(state, popToRouteIndex, route) {
  let routes = state.routes.slice(0, popToRouteIndex);

  if(route) {
    let lastRoute = routes.pop();
    let mergeParams = {};

    if(route.title) {
      mergeParams.title = route.title;
    }
    if(route.componentProps) {
      mergeParams.componentProps = route.componentProps;
    }

    routes = [
      ...routes,
      Object.assign({}, lastRoute, mergeParams)
    ];
  }

  return {
    ...state,
    index: routes.length - 1,
    routes
  };
}
