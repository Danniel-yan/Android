import { connect } from 'react-redux';

import Link from 'components/shared/Link';

import {
  externalPush,
  externalPop,
  externalReplace,
  majorPush,
  majorPop,
  majorTab
} from 'actions/navigation';

export const ExternalPushLink = connect(null, dispatch => {
  return { onPress: route => dispatch(externalPush(route)) }
})(Link);

export const ExternalReplaceLink = connect(null, dispatch => {
  return { onPress: route => dispatch(externalReplace(route)) }
})(Link);

export const ExternalPopLink = connect(null, dispatch => {
  return { onPress: () => dispatch(externalPop()) }
})(Link);

export const MajorPushLink = connect(null, dispatch => {
  return { onPress: route => dispatch(majorPush(route)) }
})(Link);

export const MajorPopLink = connect(null, dispatch => {
  return { onPress: () => dispatch(majorPop()) }
})(Link);

export const MajorTabLink = connect(null, dispatch => {
  return { onPress: route => dispatch(majorTab(route.key)) }
})(Link);
