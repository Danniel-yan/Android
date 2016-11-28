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
    fontSize: 16
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
  }
});
