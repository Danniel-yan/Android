import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';

import iconNext from 'assets/index-icons/icon_next.png';
import { ExternalPushLink } from 'containers/shared/Link';

export default class RecommendList extends Component {

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.recommends)

    return (
      <View style={{height:304}}>
        <ListView
          style={[styles.listView, styles.flexColumn,styles.bgColorWhite]}
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={this.renderRecommend}
          />
      </View>
    )
  }

  renderRecommend(data) {
    return(
    <ExternalPushLink title={data.name} toKey="LoanDetailScene" componentProps={{fetchingParams: { id: data.id }}} >
      <View style={styles.flexContainerRow}>
        <Image source={{uri: data.thumbnail}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.rightContainerTitle}>
            {data.name}
          </Text>
          <Text style={styles.rightContainerSubTitle}>
            {data.dec}
          </Text>
          <Text>{data.apply}申请  <Text><Text style={styles.unit}>{data.rate}</Text>/月</Text></Text>
          <Image style={{position:'absolute',top:30,right:0}} source={iconNext} />
        </View>
      </View>
    </ExternalPushLink>
    )
  }

}
