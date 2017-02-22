import React, { Component } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Input from 'components/shared/Input';
import { centering } from 'styles';

export default class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passNum: props.num,
      password: ""
    };
    // onComplete
  }

  // <Input type="number" ref={"ipt" + i} editable={false} style={{flex: 1, height: 48, textAlign: "center", color: this.props.disabled ? "lightgray": "#333" }} maxLength={1} value={this.state.password[i] ? this.state.password[i] : ""}></Input>
  // <Text ref={"ipt" + i} style={{flex: 1, textAlign: "center", color: this.props.disabled ? "lightgray" : "#333", fontSize: 16}}>{this.state.password[i] ? this.state.password[i] : ""}</Text>

  renderIpts() {
    var ipts = [], num = this.state.passNum;
    for(var i = 0; i<num; i++) {
      ipts.push(
        <View key={i} style={[styles.ipt, i == num - 1 ? {borderRightWidth:0}:null, centering]}>
          <Input
            type="number" ref={"ipt" + i} editable={!this.props.disabled}
            style={{flex: 1, height: 48, textAlign: "center", color: this.props.disabled ? "lightgray": "#333" }}
            maxLength={1} value={this.state.password[i] ? this.state.password[i] : ""}
            onFocus={() => this.refs["hiddenIpt"].focus()}>
          </Input>
        </View>
      );
    }
    return ipts;
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback>
        <View style={[styles.container, centering]}>
          {this.renderIpts()}
        </View>
        </TouchableWithoutFeedback>
        <TextInput type="numeric" editable={!this.props.disabled} style={{width: 0, height: 0}} ref="hiddenIpt" autoCapitalize="none" autoCorrect={false} maxLength={this.state.passNum} onChangeText={text=>this.__hiddenTextChanged__(text)}></TextInput>
      </View>
    );
  }

  __hiddenTextChanged__(text) {
    clearTimeout(this.timeFlag);
    this.setState({password: text}, () => {
      var len = this.state.password.length;

      this.__passwordChanged__();
      if(len != 6) return;
      this.timeFlag = setTimeout(() => this.__passwordComplete__(), 400);
    });
  }

  __passwordChanged__() {
    this.props.onChanged && this.props.onChanged(this.state.password);
  }

  __passwordComplete__() {
    this.props.onComplete && this.props.onComplete(this.state.password);
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 6,
    flexDirection: "row",
    height: 48
  },
  ipt: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#f2f2f2",
    // backgroundColor: "red",
    height: 48,
    flexDirection: "row"
  }
});
