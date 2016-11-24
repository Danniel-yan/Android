import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';

import iconNext from 'assets/index-icons/icon_next.png';
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
        renderRow={this.renderRecommend}
        />
    )
  }

  refresh() {
    this.props.fetching({offset: this.props.offset})
  }

  renderRecommend(data) {
    return(
    <ExternalPushLink title={data.title} toKey="LoanDetailScene" componentProps={{fetchingParams: { id: data.id }}} >
      <View style={styles.flexContainerRow}>
        <Image source={{uri: data.logo_list}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.rightContainerTitle}>
            {data.title}
          </Text>
          <Text style={styles.rightContainerSubTitle}>
            {data.info}
          </Text>
          <View style={[styles.rightContainerFooter, defaultStyle.centering]}>
            <Text style={[styles.defaultFont, defaultStyle.container]}>{data.usercount}人申请  </Text>
            <Text style={[styles.defaultFont, defaultStyle.container]}><Text style={styles.unit}>{data.interest}</Text> / {data.interest_period}</Text>
          </View>
          <Image style={{position:'absolute',top:30,right:0}} source={iconNext} />
        </View>
      </View>
    </ExternalPushLink>
    )
  }

}
