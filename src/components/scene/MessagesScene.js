import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';
import ScrollPagination from 'components/shared/ScrollPagination';
import AbstractScene from 'components/scene/AbstractScene.js';

export default class MessagesScene extends Component {
  constructor(props) {
    super(props);
    this.sceneEntity= "list";
    this.sceneTopic = "message";
    this.sceneKey = "user"
  }
  render() {
    let { isPaging, pagination, paginationParams, nomore } = this.props;
    this.latest = null;

    return (
      <ScrollPagination
        isPaging={isPaging}
        paginationParams={paginationParams}
        pagination={pagination}
        nomore={nomore}
        style={[defaultStyles.container, styles.container]}>

        { this.props.messages.map(message => this._renderMessage(message))}
      </ScrollPagination>
    );
  }

  _renderMessage(message) {
    let children = [];
    let date = message.time_create && message.time_create.split(' ')[0];

    if(this.latest != date) {
      this.latest = date;
      children.push(<View style={styles.groupTitle}><Text style={styles.date}>{date}</Text></View>)
    }

    children.push(MessagePanel(message));

    return children;
  }

}

function MessagePanel(props) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>{props.subject}</Text>
      <Text style={styles.time}>{props.time_create}</Text>
      <Text style={styles.content}>{props.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  groupTitle: {
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    height: 18,
    lineHeight: 18,
    fontSize: 10,
    color: '#fff',
    paddingHorizontal: 5,
    backgroundColor: '#DCDCDC',
    borderRadius: 2,
    textAlignVertical: 'center'
  },
  panel: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D2D2D2'
  },
  title: {
    fontSize: 18,
    color: '#333'
  },
  time: {
    marginVertical: 3,
    fontSize: 10,
    color: '#999'
  },
  content: {
    marginTop: 5,
    color: '#666',
    fontSize: 14
  }
});
