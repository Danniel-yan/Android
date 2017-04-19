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
  TextInput,
  PanResponder
} from 'react-native';

import Text from 'components/shared/Text';
import { get } from 'utils/fetch';
import * as defaultStyles from 'styles';
import { border, colors } from 'styles';
import SceneHeader from 'components/shared/SceneHeader';
import alert from 'utils/alert';
import Loading from 'components/shared/Loading';

import { window, statusBarHeight, headerHeight } from 'styles';

const sectionHeaderHeight = 30;
const sectionRowHeight = 40;
const rowBorderWidth = 0.5;
const navItemHeight = 16;
const pageHeight = window.height - statusBarHeight - headerHeight;

export default class LocationPicker extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result:[]
    };

    this.secPositionMap = [];

    this.__sideBarResponder = PanResponder.create({
      onStartShouldSetPanResponder: ev => true,
      onMoveShouldSetPanResponder: (ev, sideStatus) => this.__startMove__(ev, sideStatus),
      onPanResponderGrant: ev => true,
      onPanResponderMove: (ev, sideStatus) => this.__moveSideBar__(ev, sideStatus),
      onResponderGrant: (ev, sideStatus) => this.__startMove__(ev, sideStatus),
      onPanResponderRelease: this._handlePanResponderEnd,
      // onPanResponderTerminate: this._handlePanResponderEnd,
    }).panHandlers;
  }

  componentWillMount() {

  }

  componentDidUpdate() {
    if(!this.props.visible && this.state.shown) {
      this.setState({shown: false});
    }

    this.refs["silderCont"] && this.refs["silderCont"].measure((fx, fy, width, height, px, py) => {
            // console.log('Component width is: ' + width)
            // console.log('Component height is: ' + height)
            // console.log('X offset to frame: ' + fx)
            // console.log('Y offset to frame: ' + fy)
            // console.log('X offset to page: ' + px)
            // console.log('Y offset to page: ' + py)

            this.sideYoffset = py || ((pageHeight - this.state.secIDs.length * navItemHeight) / 2 + statusBarHeight + headerHeight);
    })


  }

  componentWillReceiveProps(nextProps) {

    let mark = nextProps && nextProps.mark ? nextProps.mark : "city";

    if(!nextProps.visible || this.state.sections) {
      return;
    }

    let url = (mark == 'city' ? '/app/city-list' : '/bill/gjj-login-elements');

    var cityResource = mark == 'city' || !this.props.gjjLoginElements ? get(url) : new Promise((resolve) => { resolve({data: this.props.gjjLoginElements})})

    cityResource.then(response => {

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
        selectedSecIdx: 0
      });

      this.refreshSecPositionMap()

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
    return true ? null : (
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
      <ScrollView ref='body' key="main"
        style={[defaultStyles.container, styles.main]}
        onScroll={ev => this.__onScroll__(ev)}
        scrollEventThrottle={16}>
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
        <View style={[defaultStyles.container]}></View>
        <View ref="silderCont" {...this.__sideBarResponder}>
        { this.state.secIDs.map((sec, idx) =>
          <View ref={"secSide" + idx} key={`${sec}`} style={{height: navItemHeight}}
          {...this.state.selectedSecIdx == idx ? {} : {}}
          >
            <Text onTouchStart={this._touchStart_.bind(this, sec, idx)}
            style={this.state.selectedSecIdx != idx ? styles.nav : styles.selectedNav}
            >{sec}</Text></View>
        ) }
        </View>
        <View style={defaultStyles.container}></View>
      </View>
    );
  }

  // componentDidMount() {
  //
  // }

  _touchStart_(toSec, idx) {
    console.log("START")
    this.startedIdx = this.state.selectedSecIdx;
    this._scrollTo(toSec, idx)
    // return true;
  }

  _scrollTo(toSec, idx) {
    // let rowHeight = sectionRowHeight + rowBorderWidth;
    // let { secIDs, sections } = this.state;
    // let toHeight = sectionHeaderHeight * idx;
    //
    // secIDs.slice(0, idx).map((sec, i) => {
    //   let sectionHeight = sections[sec].length * rowHeight;
    //   toHeight += sectionHeight;
    // });
    //
    // console.log(toHeight);
    // console.log("secPositionMap: " + this.secPositionMap[idx])

    this.refs.body.scrollTo({y: this.secPositionMap[idx]})
  }

  refreshSecPositionMap() {
    let rowHeight = sectionRowHeight + rowBorderWidth;
    let { secIDs, sections } = this.state;
    let toHeight = 0;

    this.secPositionMap = [0]
    secIDs.map((sec, idx) => {
      let sectionHeight = sections[sec].length * rowHeight;
      toHeight += (sectionHeight + sectionHeaderHeight);
      this.secPositionMap.push(toHeight);
    });
  }

  __onScroll__(ev) {
    var contentOffset = ev.nativeEvent.contentOffset, targetIdx = 0;;
    for(var i = 0; i < this.secPositionMap.length; i++) {
      if(contentOffset["y"] < this.secPositionMap[i]) {
        targetIdx = i - 1;
        break;
      }
    }

    if(this.state.selectedSecIdx != targetIdx) {
      this.setState({selectedSecIdx: targetIdx});
    }
    // contentOffset && console.log("contentOffsetYYY: " + contentOffset["y"]);
    // console.log(this.refs.body)
  }

  __startMove__(ev, sideStatus) {
    // var currentIdx = this.selectedSecIdx;
    //
    // console.log(sideStatus);
    // return false;

  }

  __moveSideBar__(ev, sideStatus) {
    // console.log(sideStatus.dy);
    var targetIdx = Math.floor((ev.nativeEvent.pageY - this.sideYoffset) / navItemHeight);

    // if()
    // var targetIdx = this.startedIdx + idxDistance;
    if(targetIdx == this.state.selectedSecIdx || targetIdx < 0 || targetIdx > this.state.secIDs.length - 1) return;
    //
    // this.setState({selectedSecIdx: targetIdx});


    this._scrollTo(null, targetIdx);
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
    color: '#278BD2',
    width: 30,
    textAlign: "center"
  },
  selectedNav: {
    color: '#278BD2',
    width: 30,
    textAlign: "center"
  },
  loading: {
    backgroundColor: '#fff'
  }
});
