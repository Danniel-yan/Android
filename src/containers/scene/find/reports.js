import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { connect } from 'react-redux';

import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import { fontSize } from 'styles';
import { externalPop } from 'actions/navigation';
import { trackingScene } from "high-order/trackingPointGenerator"

import Button from 'components/shared/ButtonBase';


const { width, height } = Dimensions.get('window');
class reports extends Component {
  tracking={key: "blacklist", topic: "report_list", event: "landing"}

  render(){
    return(
      <View style = {{flex : 1}}>
      <ScrollView>
        {this._renderItem()}

        <View style={styles.btn}>
          <Button
            style={styles.submitBtn}
            onPress={() => {this.props.externalPopTo()}}>
            <Text style={styles.submitBtnText}>再查一次</Text>
          </Button>
        </View>
      </ScrollView>
      </View>
    )
  }

  _renderItem(){
    const dataList = this.props.reports || [];
    return(
      dataList.map((data,index) => {
        return (
            <ExternalPushLink
              toKey = 'CreditReport'
              title = '网贷征信报告'
              key = {index}
              tracking={{key: "blacklist", topic: "report_list", entity: index, event: "clk"}}
              componentProps = {{}}
            >
            <View style = {styles.item}>
              <View style = {styles.left}>
                <View style = {styles.top}>
                  <View ><Text style = {styles.realName}>{data.realname}</Text></View>
                  <View ><Text style = {styles.time}>{data.time_update}</Text></View>
                </View>
                <View style = {{height : 33, justifyContent : 'center'}}><Text style = {styles.ID_num}>{data.id_num}</Text></View>
              </View>
              <NextIcon />
            </View>
          </ExternalPushLink>
        )
      })
    )
  }
}


const styles = StyleSheet.create({
  ID_num : {
    color : '#888',
    fontSize : fontSize.normal,
    //marginTop : -8
  },
  time : {
    color : '#999',
    fontSize : fontSize.xsmall,

    //flex : 1
  },
  realName : {
    fontSize : fontSize.xlarge,
    color : '#FF6D17',
    marginRight : 10
  },
  top : {
    flex : 1,
    //height : 36,
    flexDirection : 'row',
    alignItems : 'flex-end',
  },
  left : {
    flex : 1,
    flexDirection : 'column',
    //justifyContent : 'center',
    height : 67,
  },
  item : {
    height : 67,
    //width : width,
    backgroundColor : '#fff',
    marginTop : 5,
    paddingHorizontal : 15,
    flexDirection : 'row',
    alignItems : 'center'
  },
   btn : {
     paddingHorizontal : 25,
     paddingBottom : 5,
     marginTop : 20
   },
   submitBtn: {
     marginTop: 10,
     height: 46,
     borderRadius: 8,
     backgroundColor: '#FE271E',
   },
   submitBtnText: {
     fontSize: 18,
     color: '#fff'
   },
})

function mapStateToProps(state) {
  return { reports: state.blackListData.reports };
}


function mapDispatchToProps(dispatch){
  return {
    externalPopTo :() => dispatch (externalPop())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(trackingScene(reports));
