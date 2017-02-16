import React, { Component } from 'react';
import { View, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native';

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

  renderIpts() {
    var ipts = [], num = this.state.passNum;
    for(var i = 0; i<num; i++) {
      ipts.push(
        <View key={i} style={[styles.ipt, i == num - 1 ? {borderRightWidth:0}:null]}>
          <TextInput ref={"ipt" + i} editable={false} style={{flex: 1, textAlign: "center"}} maxLength={1} value={this.state.password[i] ? this.state.password[i] : ""}></TextInput>
        </View>
      );
    }
    return ipts;
  }

  render() {
    return (
      <View>
      <TouchableWithoutFeedback onPress={() => this.refs["hiddenIpt"].focus()}>
      <View style={[styles.container, centering]}>
        {this.renderIpts()}
      </View>
      </TouchableWithoutFeedback>
      <TextInput style={{width: 0, height: 0}} ref="hiddenIpt" autoCapitalize="none" autoCorrect={false} maxLength={this.state.passNum} onChangeText={text=>this.__hiddenTextChanged__(text)}></TextInput>
      </View>
    );
  }

  __hiddenTextChanged__(text) {
    this.setState({password: text}, () => {
      var len = this.state.password.length;

      this.__passwordChanged__();
      if(len != 6) return;
      console.log("SUBMIT");
      this.__passwordComplete__();
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
    height: 48
  }
});
