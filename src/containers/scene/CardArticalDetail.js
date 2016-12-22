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
import Text from 'components/shared/Text';
import { fetchCardArticalDetail } from 'actions/cardArtical';


class CardArtical extends Component {
  render() {
    let props = this.props.detail

    if(!props) {
      return <BigLoading/>
    }

    console.log(props);

    return (
      <ScrollView style={container}>
        <View style={[container, styles.container]}>
          <Text style={styles.title}>{props.title}</Text>
  
          <View style={styles.p}>
            <Text style={styles.author}>{props.author}</Text>
            <Text style={styles.tip}><Text>{props.show_num} 阅读 </Text> {props.time_create} </Text>
          </View>
  
          {this._renderContent()}
        </View>
      </ScrollView>
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
  return state.cardArtical.details[ownProps.fetchingParams] || { };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: (id) => dispatch(fetchCardArticalDetail(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(BigLoading,  CardArtical));

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
    marginBottom: 15
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
