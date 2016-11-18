import { Platform } from 'react-native';

export const colors = {
  primary: '#FE271E',
  secondary: '#FFAF32',
  white:'#fff',
  fontSizePrimary:'#666',
  fontSizeSecondary:'#333'
};

export const headerHeight = 57;
export const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
