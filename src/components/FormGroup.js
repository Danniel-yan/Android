import React, { PropTypes, Component } from 'react';
import {
  StyleSheet, View, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ListView
} from 'react-native';

import { container, rowContainer } from 'styles';
import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

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
  }

  onValueChanged(text) {
    var changedFunc = this.props.valueChanged;
    changedFunc && changedFunc(this.props.name, text);
  }

  renderComponent() {
    var s = this.styles, p = this.props || {};
    return (
      <View style={[s.container, rowContainer]}>
        <Image source={p.icon} style={{marginRight: 6}}></Image>
        <Text>{p.label}</Text>
        <TextInput keyboardType={"numeric"} style={[{flex:1, textAlign:"right"}]} onChangeText={ text => this.onValueChanged(text) } value={p.value ? p.value.toString():""}></TextInput>
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
    }
  }

  selectedOpt(idx) {
    var selectedFunc = this.props.selectedFunc;
    this.state.selectedIdx = idx;
    this.setState({selectedIdx: idx});

    selectedFunc && selectedFunc(idx);
  }

  checkItemSelected(index) {
    return index == this.state.selectedIdx;
  }

  renderComponent() {
    var s = this.styles || {},p = this.props || {},
      opts = this.props.options || [],
      eachLineCount = !p.eachLineCount || p.eachLineCount >= opts.length ? opts.length : p.eachLineCount;
      eachWidth = screenWidth / eachLineCount - 4;

    // if(!p.eachLineCount || p.eachLineCount >= opts.length) {
      return (
        <View style={[s.container]}>
        {
          opts.length > 0 && opts.map((opt, idx) => {
            var wrapS = this.checkItemSelected(idx) ? [s.optWrap, { borderColor: "#FE271E" }] : [s.optWrap],
              iptS = this.checkItemSelected(idx) ? [s.opt, { color: "#FE271E" }] : [s.opt];
            return (
              <TouchableWithoutFeedback key={idx} onPress={this.selectedOpt.bind(this, idx)}><View style={[wrapS, { width: eachWidth }]}><Text style={iptS}>{opt}</Text></View></TouchableWithoutFeedback>
            );
          })
        }
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
      selectedIdxes: []
    }
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

export class DropDown extends EnhanceStyleCp {
  constructor(props) {
    super(props);
    this.defaultStyle = DropDownStyle;
    this.state = {
      expand: false
    }
  }

  renderComponent() {
    var s = this.styles, p = this.props || {};
    var panelStyle = this.state.expand ? [s.panel] : [s.panel, s.hidden];
    var vStyle = this.state.expand ? [] : [{backgroundColor: "#fff"}];
    return (
      <View style={vStyle}>
        <TouchableWithoutFeedback onPress={() => { this.setState({expand: !this.state.expand}); }}><View style={[s.title]}><Text>{p.title}</Text></View></TouchableWithoutFeedback>
        <View style={[panelStyle, {width: p.panelWidth}]}>
        { this.props.children }
        </View>
      </View>
    );
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
  container: { padding: 4, backgroundColor: "#fff", borderColor: "#f2f2f2", borderWidth: 0, borderBottomWidth: 1, alignItems: 'center', flexDirection: 'row' }
});
const HRadiosStyles = StyleSheet.create({
  container: { width: screenWidth, flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-around', backgroundColor: "#fff", paddingTop: 4, paddingBottom: 4 },
  optWrap: { borderRadius:24, borderWidth: 1, borderColor: "#999", alignItems: "center", padding: 2, flexDirection: 'row', height: 40, marginTop: 4},
  opt: { color: "#999", paddingBottom:1, textAlign:"center", flex:1},
  select: { color: "#FE271E", borderColor: "#FE271E" }
});
const VRadiosStyles = StyleSheet.create({
  container: { width: screenWidth/2, backgroundColor: "#fff" },
  item: { height: 32, flexDirection: 'row', alignItems:"center", justifyContent: "center", borderWidth: 1, borderTopWidth: 0, borderColor: "#f2f2f2" }
});
const DropDownStyle = StyleSheet.create({
  container: { position: "relative", flex: 1 },
  title: { height:32, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  panel: { overflow: "hidden", position: "absolute", zIndex: 3 },
  hidden: { height: 0 }
});
const FormGroupStyles = StyleSheet.create({
  container: { borderColor: "#f2f2f2", borderWidth: 1, borderBottomWidth: 0 },
  item: { height: 44 }
});

// module.exports = FormGroup;
