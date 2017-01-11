export function externalPush(route) {
  return {
    type: 'externalPush',
    route
  };
}

export function externalReplace(route) {
  return {
    type: 'externalReplace',
    route
  };
}

export function externalPop(route) {
  return {
    type: 'externalPop',
    route
  };
}

export function majorPush(route) {
  return {
    type: 'majorPush',
    route
  };
}

export function majorPop() {
  return {
    type: 'majorPop'
  };
}

export function majorTab(tabName) {
  return {
    type: 'majorTab',
    tabName
  };
}
