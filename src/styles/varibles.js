import { Platform } from 'react-native';

export const colors = {
  primary: '#FE271E',
  secondary: '#FFAF32',
  line: '#e6e6e6',
  white:'#fff',
  fontColorPrimary:'#666',
  fontColorSecondary:'#333'
};

export const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
export const headerHeight = Platform.OS == 'ios' ? 57 : 40;

export const iptFontSize = Platform.OS == 'ops' ? 14 : 16;
