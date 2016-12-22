import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import {
  window,
  border,
  centering,
  responsive,
  container,
  colors,
  fontSize
} from 'styles';


import ResponsiveImage from 'components/shared/ResponsiveImage';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import BigLoading from 'components/shared/BigLoading';
import ShareButton from 'components/shared/ShareButton';
import Text from 'components/shared/Text';
import { fetchCardArticalDetail } from 'actions/cardArtical';
import Banner from 'components/Banner';
import externalScene from 'high-order/externalScene';


class CardArtical extends Component {
  render() {
    let props = this.props.detail

    if(!props) {
      return <BigLoading/>
    }

    return (
      <ScrollView style={container}>
        <View style={[container, styles.container]}>
          <Text style={styles.title}>{props.title}</Text>
  
          <View style={styles.p}>
            <Text style={styles.author}>{props.author}</Text>
            <Text style={styles.tip}><Text>{props.show_num} 阅读 </Text> {props.time_create} </Text>
          </View>
  
          {this._renderContent()}
          {this._renderBanner()}
        </View>
      </ScrollView>
    )
  }

  _renderBanner() {
    let cardConfig = this.props.cardConfig.config;
    let banner = cardConfig.info_detail_banner;

    return (
      <View style={styles.p}>
        { !banner ? null : <Banner to={banner.url} image={banner.pic} height={176}/>}
      </View>
    )
  }

  _renderContent() {
    try {
    let content = this.props.detail.content;

    let paragraphs = content.split(/\n/);

    let textAndImgs = [];

    paragraphs.forEach(paragraph => {
      if(paragraph == "") { return; }

      let paragraphImgs = paragraph.match(/\[img:.*\]/g) || [];
      let paragraphTexts = paragraph.split(/\[img:.*\]/);

      paragraphTexts.forEach((text, index) => {
        if(text) {
          textAndImgs.push(text);
        }

        if(paragraphImgs[index]) {
          textAndImgs.push(paragraphImgs[index]);
        }
      })
    });

    let contents = textAndImgs.map((content, index) => {
      return /^\[img:/.test(content) ? 
        (<Img key={"img"+index} uri={content.replace(/\[img:(.*)]/, '$1')}/>) :
        (<Paragraph key={"p"+index} content={content}/>)
    });

    return contents;
    } catch(err) { return null }
  }

}

function Img(props) {

  return (
    <View style={styles.p}>
      <ResponsiveImage uri={props.uri}/>
    </View>
  );
}

function Paragraph(props) {
  return (
    <View style={styles.p}>
      <Text style={styles.text}>{props.content}</Text>
    </View>
  );
}


function mapStateToProps(state, ownProps) {
  return {
    ...(state.cardArtical.details[ownProps.fetchingParams] || { }),
    cardConfig: state.cardConfig
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: (id) => dispatch(fetchCardArticalDetail(id))
  }
}

const shareConfig = {
  title: '朋友都说这里能够成功借到钱，我也在用',
  content: '推荐给你～',
  url: 'http://t.cn/RIJqMla'
};

let SceneComponent = AsynCpGenerator(BigLoading, CardArtical);
SceneComponent = externalScene(SceneComponent, () => <ShareButton config={shareConfig}/>);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: fontSize.xlarge,
    color: colors.darkGray
  },
  author: {
    marginBottom: 5,
    fontSize: fontSize.normal,
    color: colors.darkGray
  },
  p: {
    marginBottom: 20
  },
  text: {
    lineHeight: 20,
    fontSize: fontSize.normal,
    color: colors.grayDark
  },
  img: {
    resizeMode: 'stretch',
  }
});
