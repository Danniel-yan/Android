import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';

import { externalPop } from 'actions/navigation';
import * as defaultStyles from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

export default function(ComponentClass, config) {

  function mapDispatchToProps(dispatch) {
    return {
      onBack: () => dispatch(externalPop(config.backCount || 1))
    };
  }

  class ExternalPageComponent extends Component {
    state = { title: undefined };

    shouldComponentUpdate() {
      // TODO check state
      return false;
    }

    render() {
      let title = this.state.title || config.title || ComponentClass.title || this.props.title;
  
      return (
        <View style={defaultStyles.container}>
          <SceneHeader title={title} onBack={this.props.onBack}/>
          <View style={[defaultStyles.container, defaultStyles.bg]}>
            <ComponentClass sceneTitle={title} {...this.props} onChangeTitle={title => this.setState({title})}/>
          </View>
        </View>
      )
    }
  }

  return connect(null, mapDispatchToProps)(ExternalPageComponent);
}

