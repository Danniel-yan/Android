import { Dimensions, Platform } from 'react-native';
import { colors } from './varibles';

// 设计稿宽度
const defaultWidth = 750;
const window = Dimensions.get('window');

// 比例计算宽高
export const responsive = {
  width: function(eleWidth, designWidth = defaultWidth) {
    return window.width * eleWidth / designWidth;
  },
  // just width alias
  height: function(eleWidth, designWidth = defaultWidth) {
    return window.width * eleWidth / designWidth;
  }
};


// 设置text line height，并居中
export const textVerticalCenter = (height) => {
  return {
    [Platform.OS == 'ios' ? 'lineHeight' : 'height']: height,
    textAlignVertical: 'center',
  }
}

export function border(pos) {
  pos = pos.charAt(0).toUpperCase() + pos.substr(1);

  return {
    [`border${pos}Width`]: 0.5,
    [`border${pos}Color`]: colors.line
  };
}
