import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: 52,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line
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
    fontSize: 18,
    color: colors.secondary,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: '#fff'
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
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
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
  }
});
