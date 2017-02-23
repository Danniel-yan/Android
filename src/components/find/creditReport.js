import React, { Component } from 'react';
import { View ,StyleSheet,Text, ScrollView, Image} from 'react-native';
import zoneStyles from 'containers/scene/zone/zoneStyles';
// import NextIcon from 'components/shared/NextIcon';
import { fontSize ,colors} from 'styles';
import RecommendList from 'components/shared/RecommendList';

export default class creditReport extends Component {
  tracking = function() {
    return { key: "blacklist", topic: "report", event: "landing", result: this.props && this.props.result == 1 ? '命中' : '未命中' }
  }
  render(){
    var props = this.props || {};
    return (
      <View style={{flex : 1}}>
        <ScrollView>
            <View style={{backgroundColor : '#fff',marginVertical : 4}}>
              {false ? this._renderNavItem( '多机构申请风险等级', '中级') : null}
              {this._renderNavItem( '您的网贷信用等级', props.result == 1 ? '低' : '高')}
            </View>
            <View style={styles.sucessStatus}>
                <View style = {{flexDirection:'row', justifyContent:'center',marginBottom:10}}>
                    { props.result == 1 ? (
                        <Image source = {require('assets/icons/warnning.png')}/>
                        ) : (
                        <Image source = {require('assets/icons/percenter.png')}>
                            <View style={{paddingTop:30}}>
                                <Text style={styles.percenter}>{this.props.percenter}%</Text>
                                <Text style={styles.percenterTxt}>用户被你击败</Text>
                            </View>
                        </Image>
                    )}

                </View>
                {
                    props.result == 1 ?
                        <Text style = {styles.failInfo}>啊，网贷信用不太好诶！是有借款还没有还吗？建议你尽快还掉哦～</Text>
                        :<Text style = {styles.successInfo}>恭喜你成功通过网贷信用审核!</Text>
                }
                <View style={styles.tj}>
                    <View style={{borderLeftColor:'#FE271E', borderLeftWidth:3,}}>
                        <Text style={{fontSize:15,color:'#333',paddingLeft:15}}>{ props.result == 1 ? '精选3家不看征信的贷款产品，去试试申请吧' : '精选5家放款快，额度高的贷款产品，快去申请吧！'}</Text>
                    </View>
                </View>
            </View>
            {
                props.result == 1 ? <RecommendList recommends={this.props.fail_loanlist} /> : <RecommendList recommends={this.props.success_loanlist} />
            }


        </ScrollView>
      </View>
    )
  }

  _renderNavItem(txt, status) {
    return (
        <View style={zoneStyles.item}>
          <Text style={[zoneStyles.txt,{fontSize : 14}]}>{txt}</Text>
          <View style = {{flexDirection : 'row'}}>
            <Text style = {styles.status}>{status}</Text>
          </View>
        </View>
    )
  }


}

const styles = StyleSheet.create({
  status : {
    color : '#FF6D17',
    fontSize : 14,
    marginRight : 5
  },
  sucessStatus : {
    paddingTop : 20,
    paddingBottom : 20,
    position : 'relative',
    backgroundColor:'#fff'
  },
  tj :{
      paddingVertical:15,
      borderBottomWidth:1,
      borderBottomColor:'#e6e6e6',
      borderTopWidth:1,
      borderTopColor:'#e6e6e6',
  },
  percenter:{
    textAlign:'center',
    backgroundColor : 'transparent',
    fontSize:36,color:'#333',
    marginBottom:6
  },
    percenterTxt : {
        textAlign:'center',
        backgroundColor : 'transparent',
        fontSize:10,
        color:'#333'
    },
    successInfo : {
        textAlign:'center',
        color:'#333',
        fontSize:fontSize.xlarge,
        marginBottom:15
    },
    failInfo : {
        textAlign:'center',
        color:'#333',
        fontSize:15,
        marginBottom:15,
        paddingHorizontal:10
    }
})
