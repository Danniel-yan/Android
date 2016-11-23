import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';

export default StyleSheet.create({
  panel: {
    backgroundColor: '#fff'
  },

  header: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line
  },

  title: {
    flex: 1
  },

  addon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },

  addonTxt: {
    fontSize: 14
  },

  addonImg: {
    marginLeft: 5
  }
});
