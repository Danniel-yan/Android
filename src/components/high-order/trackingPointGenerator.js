import React from 'react';
import tracker from 'utils/tracker.js';

export default (Component) => {

  return (componentProps) => {
    let { onPress, onBlur, tracking, ...props } = componentProps;

    function _eventHandle() {
      onPress && onPress.apply(null, arguments);
      onBlur && onBlur.apply(null, arguments);
      tracking && tracker.trackAction(Object.assign({event: 'clk'}, tracking));
    }

    onPress && (props.onPress = _eventHandle);
    onBlur && (props.onBlur = _eventHandle);

    return React.createElement(Component, {...props});

  } 
}
