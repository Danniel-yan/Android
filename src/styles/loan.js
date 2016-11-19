'use strict';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions';

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  listView:{
    borderTopWidth:1,
    borderTopColor:'#e6e6e6'
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
    borderBottomColor:'#e6e6e6'
  },
  rightContainer : {
    paddingLeft : 10,
    position:'relative',
    width:Dimensions.get('window').width - 80
  },
  rightContainerTitle:{
    fontSize:17,
    color:colors.fontSizeSecondary,
    marginBottom:6
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
    borderRightColor:'#e6e6e6',
    borderStyle : 'solid',
    paddingTop:10,
    paddingBottom:10,
    alignItems:'center',
    width:Dimensions.get('window').width / 3
  },
  flexContainerColumnTitle:{
    fontSize:15,
    color:colors.fontSizeSecondary,
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
    padding:10,
    marginTop:5,
    marginBottom:10,
    marginLeft:5,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:5
  },
  cardPic:{
    width:150,
    height:80,
    marginTop:5,
    marginBottom:5
  },

  rightContainerDes:{
    fontSize:12,
    borderWidth:1,
    borderColor:'#1ab4fe',
    width:60,
    color:'#1ab4fe',
    paddingLeft:5,
    paddingRight:5
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
    lineHeight: 46,
    fontSize: 20,
    marginTop:5,
    marginBottom:5
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
    borderRightColor:'#e6e6e6',
    marginTop:15,
    marginBottom:15
  }
});

module.exports = styles;