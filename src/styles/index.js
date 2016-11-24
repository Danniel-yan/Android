import {
  Dimensions
} from 'react-native';

export const container = {
  flex: 1
};

export const rowContainer = {
  flex: 1,
  flexDirection: 'row'
};

export const flexRow = {
  flexDirection: 'row',
  alignItems: 'center',
}

export const centering = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const window = Dimensions.get('window');
