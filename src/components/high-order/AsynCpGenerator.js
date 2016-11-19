import React, { PropTypes, Component } from 'react';
import {
  View
} from 'react-native';

var AsynCpGenerator = function(FetchingCp, ElementCp) {
  return class AsynCp extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.fetching && this.props.fetching();
    }

    renderFetchingCp() {
      return FetchingCp ? <FetchingCp /> : null;
    }

    renderElementCp() {
      return React.createElement(ElementCp, this.props);
    }

    render() {
      if(this.props.isFetching) return this.renderFetchingCp()
      return this.renderElementCp();
    }

    propTypes: {
      fetching: propTypes.func.isRequired
    }
  }
}

module.exports = AsynCpGenerator;
