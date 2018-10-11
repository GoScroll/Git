import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar,TextInput,Image,TouchableOpacity,FlatList } from 'react-native';
import {pWidth,pHeight,pSize} from '../Common/utils';
import SwiperTOP from './Swiper';
import MarqueeLabelVertical from 'react-native-lahk-marquee-label-vertical';
let {width}=Dimensions.get('window');
export default class Index extends Component {

  render() {

    let data = [];
    for (let i = 0; i < 5; i++) {
      data.push({key: i, title: 'CM-花赢宝',content:'线上自动审核',way:'自审',type:'借贷',other:'极简'});
    }

    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor = '#ffe059'
              barStyle = {'dark-content'}
          />
          <View style={styles.TopView}>
            {/*<View style={{marginLeft: 5}}>*/}
              <TextInput
                  placeholderTextColorc = 'gray'
                  placeholder = { '搜索' }
                  style = { styles.TextInput }
                  underlineColorAndroid = {'transparent'}
              />
            {/*</View>*/}
            <TouchableOpacity>
              <Image style={ styles.icon } resizeMode='contain' source={ require('../../res/images/new.png') } />
            </TouchableOpacity>
          </View>
          {/*这是轮播*/}
          <SwiperTOP/>
          {/*这是第一组*/}
          <View style={styles.mid}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MidTab',{text:'床上用品'})}>
              <View style={styles.button}>
                <Image style={ styles.butt } resizeMode='contain' source={ require('../../res/images/Rukou.png') } />
                <Text>床上用品</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MidTab',{text:'日用品'})}>
              <View style={styles.button}>
                <Image style={ styles.butt } resizeMode='contain' source={ require('../../res/images/heihuzhuanqu.png') } />
                <Text>日用品</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MidTab',{text:'家具'})}>
              <View style={styles.button}>
                <Image style={ styles.butt } resizeMode='contain' source={ require('../../res/images/changzhouqi.png') } />
                <Text>家具</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MidTab',{text:'厨卫用品'})}>
              <View style={styles.button}>
                <Image style={ styles.butt } resizeMode='contain' source={ require('../../res/images/gaiedu.png') } />
                <Text>厨卫用品</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MidTab',{text:'电子电器'})}>
              <View style={styles.button}>
                <Image style={ styles.butt } resizeMode='contain' source={ require('../../res/images/dililv.png') } />
                <Text>电子电器</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/*最底部的LIST*/}
          <View style={styles.List}>
            <FlatList
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={this._header}
                ListFooterComponent={()=> this._footer()}
                showsVerticalScrollIndicator = {false}
                initialNumToRender={2}
                data={data}/>
          </View>
        </View>
    );
  }

  _header = () => {
    return (
        <View style={styles.midtwo}>
          <View style={styles.cellup}>
            <View style={styles.font}>
              <Text style={styles.mimi}>米米快报</Text>
              <Text style={styles.gongxi}>恭喜</Text>
            </View>
            <View style={styles.report}>
              <View style={styles.labelv}>
                <MarqueeLabelVertical
                    duration={8000}
                    text={'hammer在“化赢宝”上成功借到5000元'}
                    textStyle={{ fontSize: 13, color: 'black',width:pWidth(500)}}
                />
              </View>
              <Image style={ styles.mButt }  source={ require('../../res/images/JT.png') } />
            </View>
          </View>
          {/*红包*/}
          <View style={styles.celldown}>
            <TouchableOpacity>
              <Image style={ styles.Red } resizeMode='contain'  source={ require('../../res/images/Redbag.png') } />
            </TouchableOpacity>
          </View>
        </View>
    )
  };

  _footer=()=> {
    return (
        <View syle={styles.footStyle}>
          <Text>没有更多数据了</Text>
        </View>
    )
  };

  _renderItem = (item) => {
    return (
        <TouchableOpacity>
          <View style={styles.ItemView} key={item.item.key}>
            <Image style={ styles.Itembutt }  source={ require('../../res/images/Ying.png') } />
            <View style={styles.fItem}>
              <Text style={styles.fItemup}>{item.item.title}</Text>
              <Text style={styles.fItemdown}>{item.item.content}</Text>
            </View>
            <View style={styles.sItem}>
              <View style={styles.Itemgray}><Text style={styles.Itemgrayfont}>{item.item.way}</Text></View>
              <View style={styles.Itemgray}><Text style={styles.Itemgrayfont}>{item.item.type}</Text></View>
              <View style={styles.ItemRa}><Text style={styles.ItemRafont}>{item.item.other}</Text></View>
            </View>
            <Image style={ styles.mButt }  source={ require('../../res/images/JT.png') } />
          </View>
        </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopView: {
    flexDirection: 'row',
    height: pHeight(60),
    width: width,
    backgroundColor: '#ffe059',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  TextInput: {
    width: pWidth(320),
    backgroundColor: '#fff',
    height: pHeight(38),
    justifyContent: 'center',
  },
  icon: {
    marginTop: pHeight(5),
    width: pWidth(30),
    height: pHeight(30),
    marginLeft: pWidth(10),
  },
  butt: {
    width: pWidth(40),
    height: pHeight(40),
  },
  mid: {
    marginTop: pHeight(10),
    flexDirection: 'row',
    height: pHeight(95),
    width: width * 0.95,
    marginHorizontal: width*0.025,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  midtwo: {
    height: pHeight(130),
    width: width * 0.95,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },
  cellup: {
    marginTop: pHeight(3),
    flexDirection: 'row',
    height: pHeight(30),
    width: width * 0.95,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
    flex: 2,
  },
  font: {
    flex: 4,
    flexDirection: 'row',
  },
  mimi: {
    color: 'black',
    fontSize: pSize(15),
    marginLeft: pWidth(10),
  },
  gongxi: {
    fontSize: pSize(14),
    marginLeft: pWidth(10),
    color: 'red',
  },
  report: {
    flex: 8,
    flexDirection: 'row',
    alignItems:  'center',
  },
  labelv: {
    height: pHeight(10),
    width: pWidth(250),
    marginLeft:-pWidth(18),
    justifyContent:'center',
  },
  mButt: {
    height: pHeight(15),
    width: pHeight(15),
  },
  celldown: {
    marginTop: pHeight(3),
    flexDirection: 'row',
    height: pHeight(30),
    width: width * 0.95,
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 8,
  },
  Red: {
    width: width * 0.85,
  },
  List:{
    flex: 1,
    marginTop: pHeight(10),
    height: pHeight(285),
    width: width,
    alignItems:  'center' ,
  },
  ItemView: {
    flex: 1,
    marginTop: pHeight(10),
    flexDirection: 'row',
    height: pHeight(85),
    width: width * 0.95,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },
  Itembutt:{
    width: pWidth(50),
    height: pHeight(50),
  },

  fItem:{},
  sItem:{
    marginBottom: pHeight(15),
    flexDirection: 'row' ,
  },
  Itemgray:{
    width: pWidth(40),
    height: pHeight(20),
    backgroundColor: '#f0f2f4',
    borderRadius: 4,
    alignItems: 'center' ,
    justifyContent: 'center',
    marginRight: pWidth(5),
  },
  ItemRa:{
    marginLeft: pWidth(10),
    width: pWidth(50),
    height: pHeight(20),
    borderWidth: 1.5,
    borderColor: '#f37443',
    borderRadius: 10,
    alignItems: 'center' ,
    justifyContent: 'center',
  },
  fItemup:{
    color: 'black',
    fontSize: pSize(17),
  },
  fItemdown:{
    color: '#7e7e7e',
    fontSize: pSize(14),
  },
  Itemgrayfont:{
    color: '#7e7e7e',
    fontSize: pSize(14),
  },
  ItemRafont:{
    color: '#f36b36',
    fontSize: pSize(14),
  },
  footStyle: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});