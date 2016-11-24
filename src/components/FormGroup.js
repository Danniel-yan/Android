import React, { PropTypes, Component } from 'react';
import {
  StyleSheet, View, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ListView
} from 'react-native';

import Input from 'components/shared/Input';
import { container, rowContainer, flexRow, centering } from 'styles';
import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions';

var hPadding = 10;
var screenWidth = Dimensions.get('window').width;
var bodyWidth = screenWidth - hPadding * 2;

export class EnhanceStyleCp extends Component {
  constructor(props) {
    super(props);
  }
  initialStyles() {
    var defaultStyle = this.defaultStyle || {};
    this.styles = Object.assign({}, defaultStyle, this.props.styles);
  }
  render() {
    this.initialStyles();
    return this.renderComponent();
  }
  renderComponent() {
    return <Text>Abs Component</Text>;
  }
}

export class IptWrap extends EnhanceStyleCp {
  constructor(props) {
    super(props);
    this.defaultStyle = IptWrapStyles;
    this.timer = null;
  }

  onValueChanged(text) {
    var changedFunc = this.props.valueChanged;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      changedFunc && changedFunc(this.props.name, this.props.type=="number" ? parseInt(text) : text);
    }, 600);
  }

  renderComponent() {
    var s = this.styles, p = this.props || {}, defaultValue = p.value;
    return (
      <View style={[s.container, rowContainer]}>
        <Image source={p.icon} style={{marginRight: 6}}></Image>
        <Text>{p.label}</Text>
        <Input type={p.type} style={{flex: 1, textAlign:"right"}} onChangeText={ text => this.onValueChanged(text) } defaultValue={this.props.value ? this.props.value.toString():"**"}></Input>
        <Text style={{marginLeft: 4}}></Text>
      </View>
    );
  }

  propsTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // icon:
    // placeholder:
    valueChanged: PropTypes.func.isRequired
  }
}

export class HorizontalRadios extends EnhanceStyleCp {
  constructor(props) {
    super(props);
    this.defaultStyle = HRadiosStyles;
    this.state = {
      selectedIdx: null
    };
    this.selectedStyle = { sedWrp: { borderColor: "#FE271E" }, sedTxt: { color: "#FE271E" } }
  }

  selectedOpt(idx) {
    var selectedFunc = this.props.selectedChanged;
    this.state.selectedIdx = idx;
    this.setState({selectedIdx: idx});

    selectedFunc && selectedFunc(idx);
  }

  checkItemSelected(index) {
    return index == this.state.selectedIdx;
  }

  reset() {}
  submit() {
    this.props.selectedSubmit && this.props.selectedSubmit(this.state.selectedIdx);
  }

  renderBtns() {
    if(!this.props.withBtns) return;
    return (
      <View style={[flexRow, {borderTopColor: "#f0f0f0", borderBottomColor: "#f0f0f0", borderTopWidth: 1, borderBottomWidth: 1}]}>
        <TouchableWithoutFeedback onPress={()=>this.reset()}>
          <View style={[flexRow, centering, {width:screenWidth/2,backgroundColor:"white",height:36}]}><Text style={{fontSize: 14}}>重置</Text></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>this.submit()}><View style={[flexRow, centering, {width:screenWidth/2,backgroundColor:colors.secondary,height:36}]}><Text style={{color:"#fff", fontSize: 14}}>完成</Text></View></TouchableWithoutFeedback>
      </View>
    );
  }

  renderComponent() {
    var sedStyle = this.selectedStyle,
      s = this.styles || {},p = this.props || {},
      opts = this.props.options || [],
      eachLineCount = !p.eachLineCount || p.eachLineCount >= opts.length ? opts.length : p.eachLineCount;
      eachWidth = bodyWidth / eachLineCount - 4;

      return (
        <View>
          <View style={[s.container]}>
          {
            opts.length > 0 && opts.map((opt, idx) => {
              var wrapS = this.checkItemSelected(idx) ? [s.optWrap, sedStyle.sedWrp] : [s.optWrap],
                iptS = this.checkItemSelected(idx) ? [s.opt, sedStyle.sedTxt] : [s.opt];
              return (
                <TouchableWithoutFeedback key={idx} onPress={this.selectedOpt.bind(this, idx)}><View style={[wrapS, { width: eachWidth }]}><Text style={iptS}>{opt}</Text></View></TouchableWithoutFeedback>
              );
            })
          }
          </View>
          { this.renderBtns() }
        </View>
      );
  }

  propTypes: {
    options: PropTypes.array.isRequired
  }
}

export class VerticalRadios extends HorizontalRadios {
  constructor(props) {
    super(props);
    this.defaultStyle = VRadiosStyles;
    this.state = {
      selectedIdx: null
    }
  }

  renderComponent() {
    var s = this.styles, p = this.props || {}, opts = p.options || [];
    return (
      <View style={[s.container]}>
      {
        opts.length > 0 && opts.map((opt, idx) => {
          var item = idx == this.state.selectedIdx ? [s.item, { backgroundColor: "#f0f0f0" }] : [s.item],
            color = idx == this.state.selectedIdx ? "#fff": "#999";
          return <TouchableWithoutFeedback key={idx} onPress={this.selectedOpt.bind(this, idx)}><View style={[item]}><Text style={{color: color}}>{opt}</Text></View></TouchableWithoutFeedback>
        })
      }
      </View>
    );
  }
}

export class HorizontalCheckboxes extends HorizontalRadios {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdxes: this.props.selectedIdxes || []
    };
    this.selectedStyle = { sedWrp: { backgroundColor: "#C2C2C2" }, sedTxt: { color: "#fff" } }
  }

  reset() {
    this.setState({selectedIdxes: []});
  }

  submit() {
    this.props.selectedSubmit && this.props.selectedSubmit(this.state.selectedIdxes);
  }

  selectedOpt(idx) {
    var selectedFunc = this.props.selectedFunc;
    this.state.selectedIdx = idx;
    // this.setState({selectedIdx: idx});
    var oIndex = this.state.selectedIdxes.indexOf(idx);
    if(oIndex > -1) {
      this.state.selectedIdxes.splice(oIndex, 1);
    } else {
      this.state.selectedIdxes.push(idx);
    }
    this.setState({selectedIdxes: this.state.selectedIdxes});
    selectedFunc && selectedFunc(this.state.selectedIdxes);
  }
  checkItemSelected(index) {
    return this.state.selectedIdxes.indexOf(index) > -1;
  }
}

export class FormGroup extends EnhanceStyleCp {
  constructor(props) {
    super(props);
    this.defaultStyle = FormGroupStyles;
  }

  renderIptGrpCollections() {
    var ipts = this.props.iptCollections || [], eleList = [];

    ipts.length > 0 && ipts.map((info, idx)=>{
      var item = null, iptType = info.type && info.type == 'radio' ? HorizontalRadios : IptWrap;
        eleList.push(
        <View key={idx} style={[this.styles.item]}>
          {React.createElement(iptType, info)}
        </View>
        );
      })
    return eleList;
  }

  renderComponent() {
    var s = this.styles;
    return (
      <View style={[s.container]}>
        { this.renderIptGrpCollections() }
      </View>
    );
  }

  // propTypes: {
  //   iptCollections: PropTypes.arrayOf(PropTypes.shape({
  //     //icon: // require('path')
  //     name: PropTypes.string.isRequired,
  //     label: PropTypes.string.isRequired,
  //     // placeholder: PropTypes.string,
  //
  //   }))
  // }
}

const IptWrapStyles = StyleSheet.create({
  container: {
    padding: 4, paddingLeft: hPadding, paddingRight: hPadding,
    backgroundColor: "#fff",
    borderColor: "#f2f2f2", borderWidth: 0, borderBottomWidth: 1,
    alignItems: 'center', flexDirection: 'row'
  }
});
const HRadiosStyles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-around', backgroundColor: "#fff", padding: 4, paddingLeft: hPadding, paddingRight: hPadding },
  optWrap: { borderRadius:24, borderWidth: 1, borderColor: "#C2C2C2", alignItems: "center", padding: 2, flexDirection: 'row', height: 40, marginTop: 4},
  opt: { color: "#999", paddingBottom:1, textAlign:"center", flex:1},
  select: { color: "#FE271E", borderColor: "#FE271E" },
  sedWrp: { borderColor: "#FE271E" }, sedTxt: { color: "#FE271E" }
});
const VRadiosStyles = StyleSheet.create({
  container: { flex: 1,  backgroundColor: "#fff" },
  item: { height: 32, flexDirection: 'row', alignItems:"center", justifyContent: "center", borderWidth: 1, borderTopWidth: 0, borderColor: "#f2f2f2" }
});
const FormGroupStyles = StyleSheet.create({
  container: { borderColor: "#f2f2f2", borderWidth: 1, borderBottomWidth: 0 },
  item: { height: 46 }
});

// module.exports = FormGroup;
