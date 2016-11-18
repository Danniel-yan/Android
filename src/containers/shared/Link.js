import { connect } from 'react-redux';

import Link from 'components/shared/Link';

import {
  externalPush,
  externalPop,
  majorPush,
  majorPop
} from 'actions/navigation';

export const ExternalPushLink = connect(null, dispatch => {
  return { onPress: key => dispatch(externalPush(key)) }
})(Link);

export const ExternalPopLink = connect(null, dispatch => {
  return { onPress: () => dispatch(externalPop()) }
})(Link);

export const MajorPushLink = connect(null, dispatch => {
  return { onPress: key => dispatch(majorPush(key)) }
})(Link);

export const MajorPopLink = connect(null, dispatch => {
  return { onPress: () => dispatch(majorPop()) }
})(Link);
