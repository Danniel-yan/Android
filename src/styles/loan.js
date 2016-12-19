'use strict';
import { StyleSheet } from 'react-native';
import { colors, textVerticalCenter } from 'styles';
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
    padding:10,
    borderBottomWidth:1,
    borderStyle : 'solid',
    borderBottomColor: colors.line,
    alignItems: 'center'
  },
  rightContainer : {
    flex: 1,
    paddingLeft: 15,
    position:'relative',
  },
  rightContainerTitle:{
    fontSize:17,
    color:colors.fontColorSecondary,
    marginBottom:5
  },
  defaultFont: {
    fontSize: 14
  },
  rightContainerFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  rightContainerSubTitle:{
    fontSize:14,
    marginBottom:5 
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
    borderRightWidth:0.5,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    paddingTop:10,
    paddingBottom:10,
    alignItems:'center',
    width:Dimensions.get('window').width / 3
  },
  flexContainerColumnTitle:{
    fontSize:15,
    marginBottom: 14,
    color:colors.fontColorSecondary,
  },
  flexContainerColumnDes:{
    fontSize:12,
    marginBottom: 4,
  },
  flexContainerColumnPrimary:{
    fontSize:12,
    color:'#ff6d17',
  },
  thumbnail : {
    width : 50,
    height : 50,
  },
  thumbnailLarge : {
    width : 80,
    height : 80,
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
    justifyContent: 'center',
    alignItems:'flex-start'
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
  rightContainerDesText:{
    borderWidth:1,
    borderColor:'#1ab4fe',
    color:'#1ab4fe',
    fontSize:12,
    paddingHorizontal:5,
    paddingVertical:2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:2
  },
  number:{
    ...textVerticalCenter(23),
    marginBottom: 6,
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
    borderRadius:15,
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
    fontSize:18,
    color:'#333',
    paddingRight:5
  }
});

module.exports = styles;
