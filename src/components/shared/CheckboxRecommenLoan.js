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
                <Text
                    style={{paddingLeft:5,color: '#333333', flex: 1,fontSize:16}}> {this.props.checked ? '有' : '无'}  </Text>
                <Image style={{marginRight: 5}} source={require('assets/icons/arrow-down@2x.png')}/>
            </Button>
        );
    }

    _onPress() {
        this.props.onChange(!this.props.checked);
    }
}
