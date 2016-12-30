import React, {Component} from 'React';
import { View, Text, StyleSheet, Animated, TouchableHighlight , PanResponder } from 'react-native';
import Dimensions from 'Dimensions';

export default class ProgressBar extends Component{

  constructor(props){
    super(props);
    this.width = 0;
    this.state = {
      width: new Animated.Value(0),
      step:100
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove:(e, gestureState) =>{
        //return Animated.event([null,{ dx : this.state.width, dy : 0 }])

      },
      onPanResponderRelease: (e, gestureState) => {

        console.log(gestureState.moveX)

        let _previousX = gestureState.moveX ;

        if(gestureState.moveX <= 0){

          _previousX = 0

        }

        if( gestureState.moveX >= Dimensions.get('window').width - 40 ){

          _previousX = Dimensions.get('window').width - 40

        }

        this.setState({ width: _previousX })

      }

    });
  }

  render() {

    return (
      <View style={styles.progress}>
        <Animated.View style={[styles.bar,{width:this.state.width}]}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[styles.circle, {left: this.state.width }]}>
          </Animated.View>
        </Animated.View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  progress: {
    borderRadius:5,
    height:10,
    width:Dimensions.get('window').width - 40,
    margin:20,
    backgroundColor:'#e6e6e6',
    flexDirection: 'row',
  },
  bar:{
    borderRadius:5,
    height:10,
    backgroundColor:'#FFAF32',
    position:'relative'
  },
  circle: {
    borderRadius: 8,
    alignItems: 'center',
    height:16,
    backgroundColor:'#FFAF32',
    width:16,
    position:'absolute',
    top:-3
  }
});