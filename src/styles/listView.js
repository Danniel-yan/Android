'use strict';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  wrapper:{
    marginTop:5
  },
  title:{
    padding:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  bgColorWhite:{
    backgroundColor:colors.white
  },
  titleLeft:{
    fontSize:14,
    color:colors.fontSizePrimary,
    flex:1
  },
  titleRight:{
    fontSize:14
  },
  titleRightImg:{
    width:15,
    height:15,
    marginLeft:5,
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
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth:1,
    borderStyle : 'solid',
    borderBottomColor:'#e6e6e6'
  },
  rightContainer : {
    paddingLeft : 10
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
    padding:10,
    alignItems:'center'
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
    marginTop:15,
    marginBottom:15
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
  }
});

module.exports = styles;