import React, { Component } from 'react';
import {
  View,
  ListView,
  Image,
  Platform,
  StyleSheet
} from 'react-native';

import Text from 'components/shared/Text';
import styles from 'styles/loan';
import { colors, responsive, textVerticalCenter } from 'styles';

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
      <ExternalPushLink title={data.name} toKey="CardListScene" componentProps={{fetchingParams: { categoryid: data.id , bankid: 0, offset:0}}}>
        <View style={[boxStyles.box]}>
          <Image source={{uri: data.pic}} style={boxStyles.boxPic} />
          <Text style={boxStyles.title}>
            {data.name}
          </Text>
          <Text>
            {data.info}
          </Text>
        </View>
      </ExternalPushLink>
    )
  }

}

const boxStyles = StyleSheet.create({
  box: {
    marginVertical: 5,
    marginLeft: 5,
    width: responsive.width(332),
    height: responsive.width(311),
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems:'center',
  },

  boxPic: {
    width: responsive.width(253),
    height: responsive.width(158),
  },

  title: {
    ...textVerticalCenter(responsive.height(64)),
    fontSize:17,
    color:colors.fontColorSecondary,
  }
});
