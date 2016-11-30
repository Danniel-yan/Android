import {
  Dimensions
} from 'react-native';

// 设计稿宽度
const defaultWidth = 750;
const window = Dimensions.get('window');

function width(eleWidth, designWidth = defaultWidth) {
  return window.width * eleWidth / designWidth;
}

function size() {
}

export const responsive = {
  width, size
};
