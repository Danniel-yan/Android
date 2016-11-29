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
      <View>
        <ListView
          contentContainerStyle={[styles.listView, styles.flexRow]}
          enableEmptySections={true}
          dataSource={dataSource}
          horizontal={true}
          renderRow={this.renderCard}
          showsHorizontalScrollIndicator={false}
          />
      </View>
    )
  }

  renderCard(data){
    return(
      <View>
        <ExternalPushLink title={data.name} toKey="CardListScene" componentProps={{fetchingParams: { categoryid: data.id , bankid: 0}}}>
          <View style={[styles.flexHorizontalColumn,styles.bgColorWhite]}>
            <Image source={{uri: data.pic}} style={styles.cardPic} />
            <Text style={[styles.rightContainerTitle,{marginBottom:2}]}>
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
