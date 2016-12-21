
import { StyleSheet } from 'react-native';
import { colors, fontSize } from 'styles/varibles';
import Dimensions from 'Dimensions';

export default StyleSheet.create({
  mb10:{
    marginBottom:10
  },
  mb5:{
    marginBottom:5
  },
  bgColorWhite:{
    backgroundColor:colors.white
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexHorizontalColumn:{
    paddingBottom:10,
    flexDirection: 'row',
    marginTop:8
  },
  cardPic:{
    width:220,
    height:95,
    marginLeft:10,
    flex: 1,
    alignItems:'flex-start',
  },
  topic:{
    width:42,
    height:19,
    backgroundColor:'transparent',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    zIndex:1
  },
  topicText:{
    color:'#fff',
  },
  bankName:{
    marginLeft:10,
    width:Dimensions.get('window').width/2 - 20,
    fontSize:fontSize.seventeen,
    marginBottom:8,
    marginTop:15,
    backgroundColor:'transparent'
  },
  actTitle:{
    marginLeft:10,
    width:Dimensions.get('window').width/2 - 20,
    fontSize:12,
    backgroundColor:'transparent'
  },
  list:{
    backgroundColor:'#fff',
    margin:5,
    paddingVertical:10,
    paddingHorizontal:10,
    flexDirection: 'row',
    borderRadius:5
  },
  actLogo:{
    width:80,
    height:80,
    marginRight:15
  },
  detailTitle:{
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
    fontSize:fontSize.seventeen,
    color:colors.fontColorSecondary
  },
  detailDate:{
    paddingLeft:15,
    paddingBottom:15,
    fontSize:fontSize.thirteen,
    color:colors.fontColorPrimary
  },
  panelContent:{
    fontSize:14,
    color:colors.fontColorSecondary,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10
  },
  originalUrl:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderTopWidth:1,
    borderStyle : 'solid',
    borderTopColor: colors.line,
    paddingTop:8,
    paddingBottom:8
  },
  cardLogo:{
    width:40,
    height:40,
    marginRight:16,
    marginTop:5
  },
  applyBtn:{
    borderColor:'#ffaf32',
    borderWidth:1,
    width:60,
    height:22,
    borderRadius:2,
    alignItems:'center',
    marginTop:5,
    justifyContent:'center'
  },
  moreBank:{
    width: Dimensions.get('window').width / 2 -1,
    height:100,
    borderRightWidth:1,
    borderRightColor: colors.line,
    borderStyle : 'solid',
    justifyContent: 'center',
    alignItems:'center'
  },
  carList: {
    backgroundColor:'#fff',
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:15,
    paddingRight:15,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderStyle : 'solid',
    borderBottomColor: colors.line,
    marginTop:5
  },
  carLogo:{
    width:128,
    height:80,
    marginRight:15
  },
  flexColumn:{
    flex : 1,
    flexDirection: 'column'
  },
  shopLogo:{
    width:50,
    height:50,
    borderWidth:1,
    borderColor: colors.line
  },
  flexContainerRow:{
    flexDirection: 'row',
    paddingVertical:15,
    paddingHorizontal:10,
    borderBottomWidth:1,
    borderBottomColor: colors.line
  },
  rightContainer : {
    paddingLeft : 10,
    position:'relative',
    flex:1,
  },
  rightContainerTitle:{
    fontSize:fontSize.seventeen,
    color:colors.fontColorSecondary,
    marginBottom:6
  },
  rightContainerSubTitle:{
    fontSize:14,
    marginBottom:6,
    color:'#666'
  },
  decrease_price:{
    backgroundColor:'#ffaf32',
    borderRadius:2,
    marginRight:10,
    height:22,
    paddingHorizontal:3,
    justifyContent: 'center',
    alignItems:'center',
  },
  discount:{
    backgroundColor:'#ef6c6c',
    borderRadius:2,
    marginRight:10,
    height:22,
    paddingHorizontal:3,
    justifyContent: 'center',
    alignItems:'center',
  },
  nearByList:{
    paddingVertical:20,
    paddingHorizontal:10,
  },
  empty: {
    flex : 1
  },
  flexEnd:{
    alignItems:'flex-end',
    flex:1,
    justifyContent:'center'
  },
  positionText:{
    width:100,
    height:26,
    marginTop:20,
    borderColor:colors.line,
    borderWidth:1,
    borderRadius:5,
    justifyContent: 'center',
    alignItems:'center',
  }
})
