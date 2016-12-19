
import React, { PropTypes, Component, PureComponent } from 'react';

import formGroup from './formGroup';

export { formGroup } ;

import { StyleSheet, Text } from 'react-native';

import Input from 'components/shared/Input';
import Picker from 'components/shared/Picker';
import Checkbox from 'components/shared/Checkbox';
import Button from 'components/shared/ButtonBase';
import { container, rowContainer, flexRow, centering } from 'styles';
import LocationPicker from 'components/modal/LocationPicker';
import { colors, iptFontSize } from 'styles/varibles';
import * as defaultStyle from 'styles';
import Dimensions from 'Dimensions';

function InputField({value, style, valueChanged, ...props}) {
  value = value + '';

  return (
    <Input {...props} value={value} style={[styles.input, style]} onChangeText={valueChanged} />
  );
}


function PickerField({valueChanged, style, textStyle, ...props}) {
  return (
    <Picker
      {...props}
      style={[styles.touchable, style]}
      textStyle={[styles.touchableText, textStyle]}
      onChange={valueChanged} />
  );
}

function CheckboxField({value, style, valueChanged, ...props}) {
  return (
    <Checkbox
      {...props}
      checked={!!value}
      style={[styles.touchable, style]}
      onChange={valueChanged}
    />
  );
}

class LocationField extends Component {
  static defaultProps = {
    valueChanged: () => {},
    onPress: () => {},
  };
  state = { showPicker: false }

  render() {
    let {value, style, valueChanged, onPress, ...props} = this.props;
    return (
      <Button
        {...props}
        style={[styles.touchable, style]}
        text={value}
        onPress={this._onPress.bind(this)}
        >

        <Text style={this.props.textStyle}>{value}</Text>

        <LocationPicker visible={this.state.showPicker} onChange={this._onChange.bind(this)} onHide={() => this.setState({showPicker: false})}/>
      </Button>
    );
  }

  _onChange(location) {
    this.setState({ showPicker: false });
    this.props.valueChanged(location);
  }

  _onPress() {
    this.setState({ showPicker: true });
    this.props.onPress();
  }
}

export const InputGroup = formGroup(InputField);
export const PickerGroup = formGroup(PickerField);
export const CheckboxGroup = formGroup(CheckboxField);
export const LocationGroup = formGroup(LocationField);



const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    textAlign: 'right',
    fontSize: 17
  },
  touchable: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  touchableText: {
    color: '#333',
    fontSize: 17,
  }
});
