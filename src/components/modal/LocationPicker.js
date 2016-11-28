import React, { PureComponent } from 'react';

import {
  View,
  Platform,
  ScrollView,
  TouchableNativeFeeback,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ListView,
  Modal,
} from 'react-native';

import Text from 'components/shared/Text';
import { get } from 'utils/fetch';
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles';
import SceneHeader from 'components/shared/SceneHeader';
import alert from 'utils/alert';

const sectionHeaderHeight = 30;
const sectionRowHeight = 40;
const rowBorderWidth = 1;

export default class LocationPicker extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidUpdate() {
    if(!this.props.visible && this.state.shown) {
      this.setState({shown: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.visible || this.state.sections) {
      return;
    }

    get('/app/city-list').then(response => {

      let sections = {};
      let secIDs = [];

      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((sec, secIdx) => {
        response.data
          .filter(city => city.pinyin_first.toUpperCase() == sec)
          .forEach((city, rowIdx) => {
            !secIDs.includes(sec) && secIDs.push(sec);

            (sections[sec] || (sections[sec] = [])).push(city.shortname);
          });
      });

      this.setState({
        loading: false,
        secIDs,
        sections
      });

    }).catch(err => console.log(err) )
  }

  render() {
    let isShow = !this.state.loading && this.state.shown;

    let main = isShow ? this._renderMain() : null;
    let sidebar = isShow ? this._renderSidebar() : null;
    let loading = !isShow ? this._renderLoading() : null 

    return (
      <View>
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.onHide}
        onShow={() => this.setState({ shown: true, visible: true})}
        >

        <View style={defaultStyles.container}>
          <SceneHeader onBack={this.props.onHide} title="城市选择"/>

          <View style={[defaultStyles.rowContainer, styles.body]}>
            {loading}
            {main}
            {sidebar}
          </View>
        </View>

      </Modal>


      </View>
    );
  }

  _renderLoading() {
    return (<View style={[defaultStyles.container, defaultStyles.centering]}><ActivityIndicator color="white"/></View>);
  }

  _renderMain() {

    return (
      <ScrollView ref='body' key="main" style={[defaultStyles.container, styles.main]}>
        { this.state.secIDs.map(this._renderSection.bind(this)) }
      </ScrollView>
    );
  }

  _renderSection(sec) {
    let rows = this.state.sections[sec];

    return (
      <View key={`sec${sec}`}>
        <View style={styles.sectionHeader}><Text>{sec}</Text></View>
        { rows.map(this._renderRow.bind(this)) }
      </View>
    )
  }

  _renderRow(row, idx) {
    return (
      <View style={styles.row} key={`${idx}`}><Text onPress={() => this.props.onChange(row)} style={styles.rowTxt}>{row}</Text></View>
    )
  }

  _renderSidebar() {
    return (
      <View style={[styles.sidebar]}>
        <View style={defaultStyles.container}></View>
        { this.state.secIDs.map((sec, idx) => <Text onPress={this._scrollTo.bind(this, sec, idx)} key={`${sec}`} style={styles.nav}>{sec}</Text>) }
        <View style={defaultStyles.container}></View>
      </View>
    );
  }

  _scrollTo(toSec, idx) {
    let rowHeight = sectionRowHeight + rowBorderWidth;
    let { secIDs, sections } = this.state;
    let toHeight = sectionHeaderHeight * idx;
    
    secIDs.slice(0, idx).map((sec, idx) => {
      let sectionHeight = sections[sec].length * rowHeight;
      toHeight += sectionHeight;
    });

    this.refs.body.scrollTo({y: toHeight})
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#e6e6e6'
  },

  sidebar: {
    width: 30,
    paddingTop: 5,
    backgroundColor: '#e6e6e6',
    alignItems: 'center'
  },

  sectionHeader: {
    height: sectionHeaderHeight,
    paddingTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  row: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.line
  },

  rowTxt: {
    flex: 1,
    height: sectionRowHeight,
    paddingVertical: 10,
  },

  nav: {
    color: '#278BD2'
  }
});
