'use strict';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions';

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  flexColumn:{
    flex : 1,
    flexDirection: 'column'
  },
  flexContainerRow:{
    flexDirection: 'row',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderStyle : 'solid',
    borderBottomColor: colors.line
  },
  rightContainer : {
    paddingLeft : 15,
    position:'relative',
    width:Dimensions.get('window').width - 80
  },
  rightContainerTitle:{
    fontSize:17,
    color:colors.fontColorSecondary,
    marginBottom:6
  },
  defaultFont: {
    fontSize: 14
  },
  rightContainerFooter: {
    flex: 1,
    height: 20,
    flexDirection: 'row'
  },
  rightContainerSubTitle:{
    fontSize:14,
    marginBottom:6
  },
  unit:{
    color:'#ff6d17',
    fontSize:17,
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexContainerColumn: {
    justifyContent: 'center',
    borderRightWidth:1,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    paddingTop:10,
    paddingBottom:10,
    alignItems:'center',
    width:Dimensions.get('window').width / 3
  },
  flexContainerColumnTitle:{
    fontSize:15,
    color:colors.fontColorSecondary,
  },
  flexContainerColumnDes:{
    fontSize:12
  },
  flexContainerColumnPrimary:{
    fontSize:12,
    color:'#ff6d17',
  },
  thumbnail : {
    width : 50,
    height : 50,
    marginTop:10
  },
  flexHorizontalColumn:{
    paddingTop:15,
    paddingLeft:20,
    paddingRight:10,
    paddingBottom:8,
    marginTop:5,
    marginBottom:10,
    marginLeft:5,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:5
  },
  cardPic:{
    width:110,
    height:69,
    marginBottom:8
  },

  rightContainerDes:{
    borderWidth:1,
    borderColor:'#1ab4fe',
    width:60,
    height:18,
    justifyContent: 'center',
    alignItems:'center'
  },
  applyBox:{
    marginTop:5
  },
  applyTitle:{
    color:'#333',
    fontSize:17
  },
  applyBoxBody:{
    flex:1,
    flexDirection: 'row',
    marginBottom:20
  },
  flexAlignItems:{
    flex:1,
    alignItems: 'center'
  },
  loanButton:{
    width:Dimensions.get('window').width,
    backgroundColor: colors.primary,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loanButtonText:{
    color: '#fff',
    fontSize: 20,
  },

  number:{
    fontSize:20,
    color:'#ff6d17'
  },
  flexPanel:{
    flexDirection: 'column',
    flex:1,
    alignItems:'center',
    borderRightWidth:1,
    borderRightColor: colors.line,
    marginTop:15,
    marginBottom:15
  },
  selectBox:{
    borderRadius:5,
    marginLeft:5,
    marginBottom:5,
    marginRight:5,
    width:80,
    height:30,
    borderWidth:1,
    borderColor: colors.line,
    alignItems:'center',
    justifyContent: 'center',
    paddingLeft:10,
    paddingTop:0,
    paddingBottom:0,
    flexDirection: 'row'
  },
  pickerTxt:{
    fontSize:17,
    color:'#333',
    paddingRight:5
  }
});

module.exports = styles;
