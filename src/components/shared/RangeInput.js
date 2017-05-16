import React, { Component, PropTypes} from 'React';
import { View, Text, StyleSheet, Animated, PanResponder, Platform } from 'react-native';
import { container, centering, fontSize, colors, border } from 'styles';

const barHPadding = 24;

export default class RangeInput extends Component{
  static defaultProps = {
    onBlur: () => {}
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
      width: new Animated.Value(0),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: this._onMove.bind(this),
      onPanResponderRelease: this._onRelease.bind(this),
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value == this.props.value) {
      return;
    }

    this._setWidthByValue(nextProps.value);
  }

  _onRelease() {
    this.nextMoveStep = this.curStep;
    this.props.onBlur(this.curStep.value);
  }

  _onMove(e, gestureState) {
    const { min, max, step } = this.props;

    if(!this.nextMoveStep) {
      this.nextMoveStep = this.curStep;
    }

    const moveX = this.nextMoveStep.width + gestureState.dx;

    if(moveX <= 0) {
      return this.props.onChange(this.steps[0].value);
    }
    if(moveX >= this.rangMaxWidth) {
      return this.props.onChange(this.steps[this.steps.length - 1].value);
    }

    let floorStepIndex = Math.floor(moveX / this.perDisWidth);

    let halfWidth = this.perDisWidth / 2;
    let inNext = (moveX - (floorStepIndex * this.perDisWidth)) >= halfWidth;

    let nextStep = this.steps[inNext ? floorStepIndex + 1 : floorStepIndex];

    if(this.curStep.width != nextStep.width) {
      this.props.onChange(nextStep.value);
    }
  }

  _onInit(e) {
    this.rangMaxWidth = Platform.OS == "ios" ? e.nativeEvent.layout.width : e.nativeEvent.layout.width - 2 * barHPadding;
    this._initStepsWidth();
    this._setWidthByValue(this.props.value, 800);
  }

  _initStepsWidth() {
    let { min, max, step, } = this.props;
    let disSum = max - min;
    let stepCount = disSum / this.props.step;

    let perDisWidth = this.rangMaxWidth / stepCount;
    this.perDisWidth = perDisWidth;

    let steps = [{ value: this.props.min, width: 0 }];

    for(let i = 1; i < stepCount; i++) {
      let prev = steps[i - 1];

      steps.push({
        value: prev.value + this.props.step,
        width: prev.width + perDisWidth
      });
    }

    steps.push({
      value: parseInt(this.props.max).toFixed(0),
      width: this.rangMaxWidth
    })

    this.steps = steps;
  }

  _setWidthByValue(value, duration) {
    let { min, max, step } = this.props;

    let floorStepIndex = Math.floor((value - min) / step);

    this.curStep = this.steps[floorStepIndex];
    Animated.timing(this.state.width, {
      toValue: this.curStep.width,
      duration: duration || 200
    }).start();
    //this.state.width.setValue(this.curStep.width);
  }

  render() {
    return Platform.OS == 'ios' ? this.renderIOS() : this.renderAndroid();
  }

  renderIOS() {
    return (
      <View style={[styles.wrap, this.props.style]}>

        <View onLayout={this._onInit.bind(this)} style={styles.bg}>
          <Animated.View style={[styles.bar,{width:this.state.width}]}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[styles.circle]}/>

            <Animated.View style={[styles.valueTip, centering]}>
              <Text style={styles.value}>{parseInt(this.props.value)}</Text>
              <View style={styles.triangle}/>
            </Animated.View>
          </Animated.View>
        </View>

        <View style={styles.labels}>
          <Text style={[styles.label, container]}>{this.props.minLabel}</Text>
          <Text style={styles.label}>{this.props.maxLabel}</Text>
        </View>

      </View>
    );
  }

  renderAndroid() {

    return (
      <View style={[styles.wrap, this.props.style]}>

        <View onLayout={this._onInit.bind(this)} style={[styles.bg, {flexDirection: "row", alignItems: "flex-end"}]}>
          <View style={this.rangMaxWidth > 0 ? [styles.backBar, {width: this.rangMaxWidth}] : {}}></View>
          <Animated.View style={[styles.bar,{width:this.state.width}]}>

          </Animated.View>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[styles.circle, {backgroundColor: "red"}]}/>
          <Animated.View style={[styles.valueTip, centering]}>
            <View style={{backgroundColor: colors.secondary, width: 54, paddingVertical: 3, borderRadius: 5}}><Text style={styles.value}>{parseInt(this.props.value)}</Text></View>
            <View style={styles.triangle}/>
          </Animated.View>

          <View style={{flex: 1, height: 8, backgroundColor: "transparent", borderRadius: 4}}></View>
        </View>

        <View style={styles.labels}>
          <Text style={[styles.label, container]}>{this.props.minLabel}</Text>
          <Text style={styles.label}>{this.props.maxLabel}</Text>
        </View>

      </View>
    );
  }
}

var styles = Platform.OS == 'ios' ? StyleSheet.create({
  wrap: {
    paddingTop: 20,
  },
  labels: {
    marginTop: 10,
    flexDirection: 'row',
  },
  label: {
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  bg: {
    borderRadius:4,
    height: 8,
    backgroundColor:'#f2f2f2',
    borderWidth: 0.5,
    borderColor: '#ddd'
  },
  bar:{
    borderRadius: 5,
    height: 8,
    backgroundColor: colors.secondary,
    position: 'relative',
  },
  circle: {
    borderRadius: 22,
    alignItems: 'center',
    height:44,
    backgroundColor: colors.secondary,
    width:44,
    position:'absolute',
    top: -19,
    right: -7,
  },
  valueTip: {
    position: 'absolute',
    right: -27,
    top: -36,
    width: 54,
    height: 26,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  triangle: {
    position: 'absolute',
    bottom: -4,
    left: 24,
    ...border('top', 4, colors.secondary),
    ...border('right', 4, 'transparent'),
    ...border('left', 4, 'transparent'),
  },
  value: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    color: '#fff'
  },
}) : StyleSheet.create({
  wrap: {
    paddingTop: 20,
  },
  labels: {
    marginTop: 10,
    flexDirection: 'row',
  },
  label: {
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  bg: {
    paddingVertical: 8,
    paddingHorizontal: barHPadding,
    borderColor: '#ddd'
  },
  backBar: {
    borderRadius:4,
    height: 8,
    backgroundColor:'#f2f2f2',
    position: "absolute",
    bottom: 8
  },
  bar:{
    borderRadius: 5,
    height: 8,
    backgroundColor: colors.secondary
  },
  circle: {
    borderRadius: 9,
    alignItems: 'center',
    height:18,
    backgroundColor: colors.secondary,
    width:18,
    marginBottom: -5,
    marginLeft: -9
  },
  valueTip: {
    marginLeft: -35,
    marginBottom: 8,
    width: 50,
    borderRadius: 3,
    alignItems: "center"
  },
  triangle: {
    height: 14,

    ...border('top', 4, colors.secondary),
    ...border('right', 4, 'transparent'),
    ...border('left', 4, 'transparent'),
  },
  value: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    color: '#fff'
  }
});
