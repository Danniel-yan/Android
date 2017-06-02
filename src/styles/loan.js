'use strict';
import { StyleSheet } from 'react-native';
import { border, colors, textVerticalCenter } from 'styles';
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
    ...border('bottom', 1),
    alignItems: 'center'
  },
  flexContainer:{
    flexDirection: 'row',
    padding:10,
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
    ...border('right', 1),
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  loanButtonText:{
    color: '#fff',
    fontSize: 20,
  },
  rightContainerDesText:{
    borderWidth:1,
    borderColor:'#ff7429',
    color:'#ff7429',
    fontSize:10,
    marginLeft:8,
    paddingHorizontal:4,
    paddingVertical:1,
    borderRadius:2
  },
  number:{
    // ...textVerticalCenter(23),
    marginLeft:10,
    color:'#ff7429'
  },
  flexPanel:{
    flexDirection: 'column',
    flex:1,
    alignItems:'center',
    ...border('right', 1),
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
  },
  editText:{
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    alignItems:'center'
  },
  moneyTxt:{
    fontSize: 16,
    color: colors.fontColorSecondary
  },
  moneyInput:{
    flex: 1,
    textAlign: 'right',
    color: '#666',
    fontSize:16,
    padding:0
  },
  lineMargin:{
    height: 1,
    backgroundColor: '#e6e6e6',
    margin: 10
  },
  lineMargin2:{
    height: 1,
    backgroundColor: '#e6e6e6',
    marginLeft: 10,
    marginRight:10
  },
  line:{
    height: 1,
    backgroundColor: '#e6e6e6',
    marginTop: 10,
    marginBottom: 10
  },
});

module.exports = styles;
