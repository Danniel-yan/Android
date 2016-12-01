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
    flex: 1,
    fontSize:16,
    color:colors.fontColorSecondary,
  },
  addon: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  addonTxt: {
    fontSize: 14,
    color:'#999'
  },

  addonImg: {
    marginLeft: 5
  }
});
