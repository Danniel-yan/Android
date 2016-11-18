import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

import Text from 'Text';
import styles from 'styles/listView';

import iconHuanyihuan from 'assets/index-icons/icon_huanyihuan.png';

export default class RecommendList extends Component {

  render() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.props = {
      dataSource: ds.cloneWithRows(this.props.items)
    };

    return (
      <View style={styles.wrapper}>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>热门推荐</Text>
          <Text style={styles.titleRight}>
            换一批
            <Image style={styles.titleRightImg} source={iconHuanyihuan}/>
          </Text>
        </View>
        <ListView
          style={[styles.listView, styles.flexColumn,styles.bgColorWhite]}
          dataSource={this.props.dataSource}
          renderRow={this.renderRecommend}
          />
      </View>
    )
  }

  renderRecommend(data) {
    return(
      <View style={styles.flexContainerRow}>
        <Image source={{uri: data.thumbnail}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.rightContainerTitle}>
            {data.name}
          </Text>
          <Text style={styles.rightContainerSubTitle}>
            {data.dec}
          </Text>
          <View>
            <Text>{data.apply}申请</Text>
            <Text><Text style={styles.unit}>{data.rate}</Text>/月</Text>
          </View>
        </View>
      </View>
    )
  }

}
