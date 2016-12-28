import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  btn: {
    marginTop: responsive.height(60),
    backgroundColor: colors.primary,
    height: 42,
    borderRadius: 4,
  },
  btnOffset: {
    marginHorizontal: 10
  },
  btnDisable: {
    backgroundColor: '#C8C8C8'
  },
  btnText: {
    fontSize: fontSize.xlarge,
    color: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    padding: responsive.width(35)
  },
  formGroup: {
    position: 'relative',
  },
  formField: {
    fontSize: fontSize.normal,
    textAlign: 'left'
  },
  formWrap: {
    paddingTop: 15,
    paddingHorizontal: 0,
  },
  errorTip: {
    position: 'absolute',
    top: 2,
    left: 0,
    zIndex: 2,
    fontSize: fontSize.xsmall,
    color: colors.error
  }
});
