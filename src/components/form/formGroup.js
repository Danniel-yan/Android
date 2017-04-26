import React, { PropTypes, Component, PureComponent } from 'react';
import {
    StyleSheet, View, Image, Text
} from 'react-native';

import { colors } from 'styles';
import * as defaultStyle from 'styles';

export default function formGroup(FormField) {
    return class FormGroup extends Component {
        static defaultProps = {
            style: {},
            value: ''
        }

        render() {
            let { icon, label, style, children, ...props } = this.props;

            return (
                <View style={[defaultStyle.rowContainer, defaultStyle.centering, styles.wrap, style.wrap]}>
                    {this._createIcon()}
                    {this._createText()}
                    <FormField {...props} style={[defaultStyle.container, style.input]}/>
                    {children}
                </View>
            );
        }

        _createIcon() {
            let { icon, style } = this.props;

            if (!icon) {
                return null;
            }

            return (
                <Image style={[styles.icon, style.icon]} source={icon}/>
            );
        }

        _createText() {
            let { label, style } = this.props;

            if (!label) {
                return null;
            }

            return (
                <Text style={[styles.label, style.label]}>{label}</Text>
            );
        }
    }
}


const styles = StyleSheet.create({
    wrap: {
        backgroundColor: '#fff',
        height: 50,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    icon: {
        marginRight: 5,
        width: 16,
        height: 16
    },
    label: {
        fontSize: 17,
        color: '#333',
    },

});
