import React, { Component } from 'react';
import { View, ListView, Image  } from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/listView';

export default class CardList extends Component {

  componentDidMount() {
    this.props.fetchCards();
  }

  render() {
    if(this.props.isFetching) {
      return null;
    }

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.cards)

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
        <View style={[styles.flexHorizontalColumn,styles.bgColorWhite]}>
          <Image source={{uri: data.thumbnail}} style={styles.cardPic} />
          <Text style={styles.rightContainerTitle}>
            {data.name}
          </Text>
          <Text>
            {data.dec}
          </Text>
        </View>
      </View>
    )
  }

}
