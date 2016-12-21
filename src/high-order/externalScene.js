import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';

import { externalPop } from 'actions/navigation';
import * as defaultStyles from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

export default function(ComponentClass, RightComponent) {

  function mapDispatchToProps(dispatch) {
    return {
      onBack: (backCount) => dispatch(externalPop(backCount || 1))
    };
  }

  class ExternalPageComponent extends Component {
    static external = true;

    state = { title: undefined };

    render() {
      let { title, ...props } = this.props;
      title = this.state.title || title || ComponentClass.title;
  
      return (
        <View style={defaultStyles.container}>
          <SceneHeader {...props} title={title} right={RightComponent} onBack={() => this.props.onBack(this.props.backCount)}/>
          <View style={[defaultStyles.container, defaultStyles.bg]}>
            <ComponentClass sceneTitle={title} {...props} onChangeTitle={title => this.setState({title})}/>
          </View>
        </View>
      )
    }
  }

  return connect(null, mapDispatchToProps)(ExternalPageComponent);
}

