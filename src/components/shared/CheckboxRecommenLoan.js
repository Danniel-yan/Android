import React, { Component, PropTypes } from 'react';
import {
    Image,
    StyleSheet,
    Text
} from 'react-native';

import Button from './ButtonBase';

export default class CheckboxRecommenLoan extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <Button
                style={this.props.style}
                onPress={this._onPress.bind(this)}
            >
                <Text style={{paddingLeft:7,color: '#333333'}}> {this.props.checked ? '有' : '无'}  </Text>
            </Button>
        );
    }

    _onPress() {
        this.props.onChange(!this.props.checked);
    }
}
