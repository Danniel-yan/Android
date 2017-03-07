import React, { Component } from 'react';
import { View, ListView, Image, StyleSheet  } from 'react-native';

import Text from 'components/shared/Text';
import RemoteImage from 'components/shared/RemoteImage';
import styles from 'styles/loan';

import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import * as defaultStyle from 'styles';

export default class RecommendList extends Component {
  static defaultProps = {
    recommends: []
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.recommends)

    return (
      <ListView
        style={[styles.listView, styles.flexColumn,styles.bgColorWhite]}
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={this.renderRecommend.bind(this)}/>
    )
  }

  refresh() {
    this.props.fetching({offset: this.props.offset})
  }

  renderRecommend(data, sID, rowID) {
    let tracking = Object.assign({
      entity: rowID,
      id: data.id,
      title: data.title
    }, this.props.itemTracking);

    return(
      <ExternalPushLink
        tracking={tracking}
        title={data.title}
        toKey="LoanDetailScene"
        componentProps={{fetchingParams: data.id, ...data }} >
        <View style={styles.flexContainerRow}>
          <RemoteImage uri={data.logo_list} style={styles.thumbnail} />
          {!this.props.isIOS ?
            <View style={styles.rightContainer}>
              <Text style={styles.rightContainerTitle}>{data.title}</Text>
              <Text style={styles.rightContainerSubTitle}>{data.info}</Text>
              <View style={[styles.rightContainerFooter]}>
                <Text style={[styles.defaultFont, defaultStyle.container]}>{data.usercount}人申请  </Text>
                <Text style={styles.unit}>{data.interest}</Text>
                <Text style={styles.defaultFont}> / {data.interest_period}</Text>
              </View>
            </View> :
              <View style={styles.rightContainer}>
                <View style={loanItem.top}>
                  <Text style={styles.rightContainerTitle}>{data.title}</Text>
                  <View style={loanItem.top}>
                    <Text style={loanItem.bgTitle}>{data.ios_bg}</Text>
                    <Text style={loanItem.txt}>背景</Text>
                  </View>
                </View>
                <View style={loanItem.bottom}>
                  <View style={loanItem.left}>
                    <Text style={loanItem.colorTxt}>{data.ios_shouyi}</Text>
                    <Text style={loanItem.txt}>平均收益</Text>
                  </View>
                  <View style={loanItem.right}>
                    <Text style={loanItem.txt}>网友评价</Text>
                    <Text style={loanItem.colorTxt}>{data.ios_haoping}</Text>
                  </View>
                </View>
              </View>
          }

            {this.props.isIOS ? null : <NextIcon/>}
        </View>
      </ExternalPushLink>
    )
  }

}


const loanItem = StyleSheet.create({
  top:{
    flexDirection:'row',
    alignItems:'center',
  },
  bg:{
    flexDirection:'row',
  },

    bgTitle:{
      color:'#FF003C',
      fontSize:12,
      marginRight:3,
      marginLeft:10,
    },
    txt:{
      color:'#999',
      fontSize:12,
    },
    bottom:{
      flexDirection:'row',
        alignItems:'center',
        marginTop:15,
    },
    left:{
      flexDirection:'row',
        alignItems:'center',
        width:120,
    },
    right:{
      flexDirection:'row',
        alignItems:'center',
        flex:1,
    },
    colorTxt:{
        color:'#FF003C',
        fontSize:12,
    }
});