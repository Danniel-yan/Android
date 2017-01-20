import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

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
        renderRow={this.renderRecommend.bind(this)}
        />
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
          <View style={styles.rightContainer}>
            <Text style={styles.rightContainerTitle}>{data.title}</Text>
            <Text style={styles.rightContainerSubTitle}>{data.info}</Text>
            <View style={[styles.rightContainerFooter]}>
              <Text style={[styles.defaultFont, defaultStyle.container]}>{data.usercount}人申请  </Text>
              <Text style={styles.unit}>{data.interest}</Text>
              <Text style={styles.defaultFont}> / {data.interest_period}</Text>
            </View>
          </View>

          <NextIcon/>
        </View>
      </ExternalPushLink>
    )
  }

}
