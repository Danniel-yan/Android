import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';

import { ExternalPushLink } from 'containers/shared/Link';

export default class CategoryList extends Component {

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.category)

    return (
      <View style={{height:165}}>
        <ListView
          contentContainerStyle={[styles.listView, styles.flexRow]}
          enableEmptySections={true}
          dataSource={dataSource}
          horizontal={true}
          renderRow={this.renderCard}
          />
      </View>
    )
  }

  renderCard(data){
    return(
      <View>
        <ExternalPushLink title="极速办卡" toKey="CardListScene" componentProps={{fetchingParams: { categoryid: data.id }}}>
          <View style={[styles.flexHorizontalColumn,styles.bgColorWhite]}>
            <Image source={{uri: data.pic}} style={styles.cardPic} />
            <Text style={styles.rightContainerTitle}>
              {data.name}
            </Text>
            <Text>
              {data.info}
            </Text>
          </View>
        </ExternalPushLink>
      </View>
    )
  }

}
