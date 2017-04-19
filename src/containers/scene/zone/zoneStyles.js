import { StyleSheet } from 'react-native';
import { border, colors } from 'styles';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    ...border('bottom', 0.5, "#e6e6e6")
  },
  txt: {
    flex: 1,
    color: '#333',
    fontSize: 17
  },
  icon: {
    marginRight: 15
  },
  group: {
    marginTop: 5
  },
  btn: {
    marginTop: 50,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: '#fff'
  },
  btnText: {
    fontSize: 18,
    color: colors.secondary,
  },
  formControl: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10
  },
  optional: {
    marginTop: 5,
  },

  optionalHeader: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    ...border('bottom'),
    justifyContent: 'center'
  },

  optionalTxt: {
    color: '#999',
  },
  pickerGroup: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  pickerTxt: {
    marginRight: 10
  },
  itemHeader: {
    height: 40,
  },
  itemBody: {
    paddingLeft: 45,
    height: 52
  },
  linkTxt: {
    fontSize: 16,
    color: '#0090FF'
  },
  loginWrap: {
    height: 93,
    backgroundColor: '#fff',
    marginBottom: 5
  },
  loginBtn: {
    paddingHorizontal: 10,
    height: 33,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  loginBtnText: {
    color: colors.secondary,
    fontSize: 17
  }
});
