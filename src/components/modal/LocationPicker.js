import React, { PureComponent } from 'react';

import {
  View,
  Platform,
  ScrollView,
  TouchableNativeFeeback,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Modal,
  TextInput
} from 'react-native';

import Text from 'components/shared/Text';
import { get } from 'utils/fetch';
import * as defaultStyles from 'styles';
import { border, colors } from 'styles';
import SceneHeader from 'components/shared/SceneHeader';
import alert from 'utils/alert';
import Loading from 'components/shared/Loading';

const sectionHeaderHeight = 30;
const sectionRowHeight = 40;
const rowBorderWidth = 0.5;

export default class LocationPicker extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result:[]
    };
  }

  componentDidUpdate() {
    if(!this.props.visible && this.state.shown) {
      this.setState({shown: false});
    }
  }

  componentWillReceiveProps(nextProps) {

    let { mark } = nextProps.mark;

    if(!nextProps.visible || this.state.sections) {
      return;
    }

    let url = (mark == 'city' ? '/app/city-list' : '/bill/gjj-login-elements');

    get(url).then(response => {

      let sections = {};
      let secIDs = [];

      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((sec, secIdx) => {
        response.data
          .filter(city => (mark == 'city') ? city.pinyin_first.toUpperCase() == sec : city.area_name_pinyin_first.toUpperCase() == sec)
          .forEach((city, rowIdx) => {

            !secIDs.includes(sec) && secIDs.push(sec);

            (sections[sec] || (sections[sec] = [])).push(mark == 'city'? city.shortname : city.area_name );

          });
      });

      this.setState({
        loading: false,
        secIDs,
        sections,
      });

    }).catch(err => console.log(err) )
  }

  render() {

    let { mark } = this.props;

    let isShow = !this.state.loading && this.state.shown;

    let main = isShow ? this._renderMain() : null;
    let sidebar = isShow ? this._renderSidebar() : null;
    let loading = !isShow ? this._renderLoading() : null;

    let search = (mark == 'fundCity')? this._renderSearch() : null ;

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
          <View>
            {search}
            {this._renderResult()}
          </View>
          <View style={[defaultStyles.rowContainer, defaultStyles.bg]}>
            {loading}
            {main}
            {sidebar}
          </View>
        </View>

      </Modal>


      </View>
    );
  }

  _renderSearch(){
    return (
      <TextInput
        placeholder='搜索城市'
        style={{height:30,backgroundColor:'#fff',fontSize:12,color:'#A5A5A5',paddingLeft:10,borderWidth:1,borderColor:'#e6e6e6'}}
        onFocus={ () => {this.setState({shown: false})}}
        onChangeText = {this._renderCity.bind(this, 'city')}
        />
    )
  }

  _renderCity(city, value){
    if(!value) {
      this.setState({shown: true,result:[]})
    }else{

      console.log(this.state.sections);

      this.setState({result: this.state.sections[value] })
    }
  }

  _renderResult(){

    if(!this.state.result) return null;

    return(
      <ScrollView>
        { this.state.result.map( (city, idx) =>
            <View style={{padding: 10}} key={`${idx}`}><Text onPress={() => this.props.onChange(city)}>{city}</Text></View>
        )}
      </ScrollView>
    )
  }


  _renderLoading() {

    if( this.state.shown == false ) return null;

    return (<View style={[defaultStyles.container, defaultStyles.centering, styles.loading]}><Loading color="white"/></View>);
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
      <View style={[styles.sidebar, defaultStyles.bg]}>
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

  sidebar: {
    width: 30,
    paddingTop: 5,
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
    ...border('bottom'),
  },

  rowTxt: {
    flex: 1,
    height: sectionRowHeight,
    paddingVertical: 10,
  },

  nav: {
    color: '#278BD2'
  },
  loading: {
    backgroundColor: '#fff'
  }
});
