import React, { Component } from 'react';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import {pWidth,pHeight,pSize} from '../Common/utils';
var swi = require('../../res/json/Swi');
const {width, height} = Dimensions.get('window');

export default class Mid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      size: {
        width,
        height
      },
    };
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({
      size: {
        width: layout.width,
        height: pHeight(150),
      }
    });
  }

  render() {
    return (
        <View style={ styles.SwiperStyles } onLayout={ this._onLayoutDidChange }>
          <Carousel delay={ 6000 } style={ this.state.size } autoplay onAnimateNextPage={ (p) => console.log(p) } bullets={ true } bulletStyle={ { backgroundColor: '#fff',width: 7,height: 7 } }
                    chosenBulletStyle={ { backgroundColor: '#f6d574' ,width: 7,height: 7 } }>
            { this.renderAllImage() }
          </Carousel>
        </View>
    );
  }
  renderAllImage() {
    let allImage = [];
    let imgsArr = swi.data;
    for (let i = 0; i < imgsArr.length; i++) {
      allImage.push(
          <View key={ i * 10 } style={ [{ backgroundColor: '#F5FCFF' }, this.state.size] }>
            <Image key={ i } source={ { uri: imgsArr[i].img } } style={ [{ resizeMode: 'stretch' }, this.state.size] }/>

          </View>
      );
    }
    return allImage;
  }

}
const styles = StyleSheet.create({
  SwiperStyles: {
    width: width,
    height: pHeight(150),
  },
});