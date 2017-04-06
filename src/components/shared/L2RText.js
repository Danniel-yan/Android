import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
} from 'react-native'

import { container, fontSize, colors, border } from 'styles';

export default function L2RText({style, left, right, leftStyle, rightStyle, ...props}) {
    return (
        <View style={[styles.item, style]}>
            <Text style={[container, styles.left, leftStyle]}>{left}</Text>
            <Text style={[styles.right, rightStyle]}>{right}</Text>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 30,
        backgroundColor: '#fff'
    },
    left: {
        fontSize: fontSize.large,
        color: colors.grayDark
    },
    right: {
        fontSize: fontSize.large,
        color: colors.grayDark
    }
})
