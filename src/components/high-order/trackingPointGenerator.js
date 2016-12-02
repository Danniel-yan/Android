import React from 'react';
import tracker from 'utils/tracker.js';

export default (Component) => {

  return (componentProps) => {
    let { onPress, tracking, ...props } = componentProps;

    function _onPress() {
      onPress && onPress.apply(null, arguments);
      tracking && tracker.trackAction(tracking.key, tracking.entity, tracking.topic, tracking.event);
    }

    return React.createElement(Component, {...props, onPress: _onPress});
  } 
}
