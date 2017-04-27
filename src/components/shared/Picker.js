import React, {Component, PropTypes} from 'react';
import {
    Modal,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
    PickerIOS,
    Image,
    Platform,
} from 'react-native';

import {border, colors} from 'styles';
import Text from './Text';
import Button from './ButtonBase';
import * as defaultStyles from 'styles';
import trackingPoint from 'high-order/trackingPointGenerator';

export class PickerComponent extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired
    };

    static defaultProps = {
        items: []
    };

    get items() {
        if (this.props.items && this.props.items.length == 0) {
            return this.props.items;
        }

        let items = this.props.items.map(item => {
            return typeof item == 'object' ? item : {label: item, value: item}
        });

        return items;
    }

    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        };
    }

    render() {
        return (
            <Button
                style={this.props.style}
                onPress={() => this.setState({openModal: true})}
            >

	            <Text style={[this.props.textStyle, {flex: 1}]}>{this._label()}{this.props.text ? <Text style={{color:'#fe271e',fontSize:16}}>{this.props.text}</Text> : null}</Text>
                {this._showArrow()}
                <Modal
                    animationType="fade"
                    visible={this.state.openModal}
                    transparent={true}
                    onRequestClose={() => this.setState({openModal: false})}
                >

                    <TouchableOpacity style={[defaultStyles.container, styles.bg]} activeOpacity={1}
                                      onPress={this._onHide.bind(this)}/>
                    {Platform.OS == 'ios' ? this._renderIOSPicker() : this._renderAndroidPicker()}
                </Modal>
            </Button>
        );
    }

    _showArrow() {
        return this.props.withArrow ?
            <Image style={{marginRight: 5}} source={require('assets/icons/arrow-down@2x.png')}/> : null
    }

    _label() {
        if (!this.props.value) {
            return '';
        }

        var selectedItem = this.items.find(item => item.value == this.props.value);

        return selectedItem ? selectedItem.label : "";
    }

    _renderAndroidPicker() {
        const style = this.items.length > 4 ? {height: 178} : undefined;

        return (
            <View style={[styles.container, style]}>
                <ScrollView>
                    { this.items.map(item => {
                        return (
                            <TouchableNativeFeedback
                                key={`key${item.value}`}
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={this._onSelectedItem.bind(this, item.value)}>
                                <View style={[styles.androidItem, defaultStyles.centering]}>
                                    <Text>{item.label}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        );
                    }) }
                </ScrollView>
            </View>
        );
    }

    _onSelectedItem(value) {
        this.props.onChange(value);

        this.setState({
            openModal: false,
        });
        this.props.onBlur && this.props.onBlur(value);
    }

    _onHide() {
        this.setState({openModal: false});
        this.props.onBlur && this.props.onBlur(this.props.value);
    }

    _renderIOSPicker() {
        return (
            <View style={[styles.container, styles.containerIOS]}>
                <View style={styles.header}>
                    <Button style={styles.btn} textStyle={styles.btnText} onPress={this._onHide.bind(this)} text="完成"/>
                </View>

                <PickerIOS
                    style={styles.picker}
                    selectedValue={this.props.value}
                    onValueChange={this.props.onChange}>

                    { this.items.map(item => {
                        return (
                            <PickerIOS.Item
                                key={`item${item.value}`}
                                value={item.value}
                                label={'' + item.label}
                            />
                        );
                    }) }
                </PickerIOS>
            </View>
        );
    }

}


export default trackingPoint(PickerComponent);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        ...border('top'),
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },

    containerIOS: {
        height: 200
    },

    bg: {
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    header: {
        paddingHorizontal: 10,
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
        ...border('bottom'),
    },

    picker: {},

    pickerItem: {
        fontSize: 16,
    },

    btnText: {
        fontSize: 16,
    },

    androidItem: {
        height: 42,
        ...border('bottom'),
    },
    paddingStyle: {
    	paddingHorizontal: 20,
	    zIndex: 99,
    }
});
