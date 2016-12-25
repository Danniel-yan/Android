import { Platform } from 'react-native';

export const colors = {
  error: '#FF003C',
  primary: '#FE271E',
  secondary: '#FFAF32',
  line: '#e6e6e6',
  white:'#fff',
  fontColorPrimary:'#666',
  fontColorSecondary:'#333',
  grayLight: '#999',
  gray: '#666',
  grayDark: '#333'
};

export const fontSize = {
  seventeen : 17,
  thirteen : 13,
  xlarge: 17,
  large: 16,
  normal: 14,
  small: 13,
  xsmall: 12,
}

export const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
export const headerHeight = Platform.OS == 'ios' ? 57 : 40;

// export const iptFontSize = Platform.OS == 'ops' ? 14 : 16;
export const iptFontSize = 16;
