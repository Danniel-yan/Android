import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';

import * as defaultStyles from 'styles';
import { externalPop } from 'actions/navigation';
import SceneHeader from 'components/shared/SceneHeader';

export default function(ComponentClass) {

  class ExternalPageComponent extends Component {
    state = { title: undefined };

    render() {
  
      return (
        <View style={defaultStyles.container}>
          <SceneHeader title={this.state.title || ComponentClass.title || this.props.title} onBack={this.props.onBack}/>
          <ComponentClass {...this.props} onChangeTitle={title => this.setState({title})}/>
        </View>
      )
    }
  }

  return connect(null, mapDispatchToProps)(ExternalPageComponent);
}


function mapDispatchToProps(dispatch) {
  return {
    onBack: () => dispatch(externalPop())
  };
}
