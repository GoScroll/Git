import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
import * as ScreenUtils from "../../Common/ScreenUtils";

var Data =[
  {question:'新的风暴已经出现',answer:'怎么能够停止不前'},
  {question:'好饿可是不能吃',answer:'别问为什么反正不能吃'},
  {question:'白驹一晃人已瘦',answer:'少年化老朽'},
];
export default class Help extends Component{
  static navigationOptions = {
    headerTitle: '帮助',
    headerTitleStyle: {
      flex: 1,
      textAlign:'center'
    },
    headerRight: <View/>
  };
  render(){
    return(
        <View style={styles.container}>
          <Text style={{fontSize:ScreenUtils.setSpText(25),marginTop: ScreenUtils.scaleSize(20),marginLeft:ScreenUtils.scaleSize(10)}}>常见问题</Text>
          <FlatList
              data={Data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={this._renderItemSeparatorComponent}
          />
        </View>
    )
  }
  _renderItem=(item,index)=>{
    let title=item.item.question;
    let title2=item.item.answer;
    return(
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DetailHelp',{question:title,answer:title2})}>
          <View style={{width:ScreenUtils.scaleSize(800), marginLeft:ScreenUtils.scaleSize(20), flexDirection: 'row',justifyContent: 'space-between',}}>
            <Text style={styles.title}>{title}</Text>
            <View style={{width:ScreenUtils.scaleSize(150),justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
              <Image source={require('../../../res/images/ahead.png')} style={{height: ScreenUtils.scaleSize(60),width: ScreenUtils.scaleSize(60)}}/>
            </View>
          </View>
        </TouchableOpacity>
    );
  };
  _renderItemSeparatorComponent = ({highlighted}) => (
      <View style={{height: 1, backgroundColor: '#F3F4F6'}}/>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  button:{
    width:width,
    height: ScreenUtils.scaleSize(80),
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: 'white'

  },
  title:{
    fontSize:ScreenUtils.setSpText(19),
    marginLeft: ScreenUtils.scaleSize(10),
    marginTop: ScreenUtils.scaleSize(15),
  }
});