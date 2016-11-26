import React, { Component } from 'react';
import { ScrollView, View, ListView, Image , TouchableOpacity} from 'react-native';
import Text from 'components/shared/Text';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';
import { window } from 'styles';

export default class ActHotDetailScene extends Component {

  render(){
    const props = this.props.detail;

    return(
      <ScrollView>
        <View style={styles.bgColorWhite}>
          <Image source={{uri: props.top_banner}} style={{width:window.width,height:window.width * (320 / 750)}}/>
          <Text style={styles.title}>{props.title}#天天民生日#10 元吃哈根达斯</Text>
          <Text style={styles.date}>活动时间：截止{props.end_date}</Text>
        </View>

       <View style={[styles.bgColorWhite,{marginTop:5,paddingLeft:15}]}>
         <Text style={styles.panelTitle}>活动内容</Text>
         <Text style={styles.panelList}>1.需要报名</Text>
         <Text style={styles.panelList}>1.需要报名需要报名需要报名需要报名需要报名需要报名需要报名需要报名</Text>

         <Text style={styles.panelTitle}>参与方式</Text>
         <Text style={styles.panelList}>● 微信关注</Text>

         <Text style={styles.panelTitle}>注意事项</Text>
         <Text style={styles.panelList}>● 每人每卡活动期间限参加一次</Text>
         <Text style={styles.panelList}>● 每人每卡活动期间限参加一次</Text>

         <TouchableOpacity onPress={()=>{ this.props.externalPushToWeb && this.props.externalPushToWeb(props.original_url) }}>
           <View style={styles.originalUrl}>
             <Text style={{flex:1}}>查看原文</Text>
             <View style={{flexDirection: 'row',alignItems: 'center',paddingRight:15}}>
              <Image source={require('assets/index-icons/icon_next.png')}/>
             </View>
           </View>
         </TouchableOpacity>

       </View>

        <View style={{marginTop:5}}>
          <Image source={{uri: props.top_banner}} style={{width:window.width,height:window.width * (200 / 750)}}/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  title:{
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
    fontSize:17,
    color:colors.fontColorSecondary
  },
  date:{
    paddingLeft:15,
    paddingBottom:15,
    fontSize:13,
    color:colors.fontColorSecondary
  },
  panelTitle:{
    fontSize:16,
    color:colors.fontColorSecondary,
    paddingTop:10,
    paddingBottom:10,
    fontWeight:'bold'
  },
  panelList:{
    fontSize:14,
    paddingBottom:5,
    paddingRight:15,
    paddingLeft:10
  },
  originalUrl:{
    marginTop:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderTopWidth:1,
    borderStyle : 'solid',
    borderTopColor: colors.line,
    paddingTop:8,
    paddingBottom:8
  }
})
