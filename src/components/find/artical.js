import React, { Component } from 'react';
import { View, ListView, Image, StyleSheet, Text } from 'react-native';

import styles from 'styles/loan';

import { ExternalPushLink } from 'containers/shared/Link';
import * as defaultStyle from 'styles';

export default class articalList extends Component {
  static defaultProps = {
    recommends: []
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.recommends)
    return (
      <View>
        <View style = {articalStyles.main}><Text style = {articalStyles.mainTxt}>精选</Text></View>
        <ListView
          style={[styles.listView, styles.flexColumn,styles.bgColorWhite]}
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={this.renderRecommend.bind(this)}
          />
      </View>
    )
  }

  renderRecommend(data, sID, rowID) {
    return(
       <ExternalPushLink
        style = {articalStyles.containers}
        key = {data.id}
        toKey="FindArticleDetail"
        title="精选"
        prePress={() => this.__toDetail__(data.id)}
        tracking={{key: "discover", topic: "feature", title: data.title, entity: rowID}}
        componentProps={{fetchingParams: data.id, ...data }}
       >
        <View style = {articalStyles.box}>
          <Text style = {articalStyles.title}>{data.title}</Text>
          <Text style = {articalStyles.num}>阅读{data.show_num}</Text>
        </View>
        <Image source = {{uri : data.pic}} style = {{width : 130,height : 80}}/>
        </ExternalPushLink>
    )
  }

  __toDetail__(id) {
    this.props.fetchArticalDetail && this.props.fetchArticalDetail(id);
  }

}
const articalStyles = StyleSheet.create({
  containers : {
    paddingHorizontal: 10,
    flexDirection : 'row',
    alignItems : 'center',
    borderBottomColor : '#e6e6e6',
    borderBottomWidth : 1,
    height : 116
  },
  box : {
    flex : 1,
    position : 'relative',
    height : 116
  },
  title : {
    marginBottom : 20,
    textAlign : 'left',
    fontSize : 17,
    color : '#333',
    position : 'absolute',
    left : 0,
    top : 18,
  },
  num : {
    color : '#999',
    fontSize : 12,
    textAlign : 'left',
    position : 'absolute',
    left : 0,
    bottom : 18,
  },
  main : {
    borderBottomWidth : 1,
    borderBottomColor : '#e6e6e6',
    paddingVertical : 10,
  },
  mainTxt : {
    paddingLeft : 10,
    fontSize : 16,
    color : '#333'
  }
})
