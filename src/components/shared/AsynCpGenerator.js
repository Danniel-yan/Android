import React, { PropTypes, Component } from 'react';
import {
    View
} from 'react-native';

var AsynCpGenerator = function(FetchingCp, ElementCp) {
    return class AsynCp extends Component {
        constructor(props) {
            super(props);
        }

        renderFetchingCp() {
            if(!this.props.isFetching) return null;
            return <FetchingCp />;
        }

        renderElementCp() {
            if(this.props.isFetching) return null;
            return React.createElement(ElementCp, this.props);
        }

        // componentDidMount() {
        //   this.props.fetchBannerImgList();
        // }

        render() {
            return (
                <View>
                    {this.renderFetchingCp()}
                    {this.renderElementCp()}
                </View>
            );
        }
    }
}

module.exports = AsynCpGenerator;
