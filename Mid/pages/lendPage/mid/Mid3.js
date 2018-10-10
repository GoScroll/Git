import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, Dimensions, FlatList} from 'react-native';
let ret = require('../../../res/json/Mid');
const {width} = Dimensions.get('window');
import * as ScreenUtils from '../../Common/ScreenUtils'
import {pHeight} from "../../Common/utils";
import Icon1 from "react-native-vector-icons/Ionicons";

export default class Mid1 extends Component{

  render() {
    let data = ret.data;
    return (
        <View style={styles.container}>
          <View style={styles.NavBar}>
            <TouchableOpacity style={styles.touch} onPress={()=> this.props.navigation.pop()}>
              <Icon1 name="ios-arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.title}>家具</Text>
            <View/>
          </View>
          <Image style={{width: width, height: 200}} source={require('../../../res/images/mid.jpg')}/>
          <View style={styles.container2}>
            <FlatList
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={()=> this._footer()}
            />
          </View>
        </View>
    );
  }
  renderItem=(item)=> {
    return(
        <TouchableOpacity>
          <View style={styles.ItemView} key={item.item.key}>
            <Image style={styles.Itembutt}  source={{uri: item.item.img}} />
            <View style={styles.row}>
              <View>
                <View style={styles.row1Style}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color:'black'}}>{item.item.name}</Text>
                  <Text style={styles.textStyle}>{item.item.attributes}</Text>
                </View>
                <Text>{item.item.Introduction}</Text>
              </View>
              <Image style={ styles.mButt }  source={ require('../../../res/images/JT.png') } />
            </View>
          </View>
        </TouchableOpacity>
    )
  };

  _footer=()=> {
    return (
        <View syle={styles.footStyle}>
          <Text>没有更多数据了</Text>
        </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    flex: 1,
    marginTop: ScreenUtils.scaleSize(10),
  },
  ItemView: {
    marginTop: ScreenUtils.scaleSize(10),
    flexDirection: 'row',
    height: ScreenUtils.scaleSize(130),
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Itembutt: {
    marginHorizontal: ScreenUtils.scaleSize(10),
    width: ScreenUtils.scaleSize(100),
    height: ScreenUtils.scaleSize(100),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row1Style: {
    marginBottom: ScreenUtils.scaleSize(8),
    flexDirection: 'row',
  },
  mButt: {
    height: ScreenUtils.scaleSize(36),
    width: ScreenUtils.scaleSize(36),
  },
  textStyle: {
    color: 'orange',
    marginLeft: ScreenUtils.scaleSize(20),
    borderWidth: 1,
    borderColor: 'orange',
    paddingHorizontal: ScreenUtils.scaleSize(26),
    paddingVertical: ScreenUtils.scaleSize(3),
    borderRadius: ScreenUtils.scaleSize(5),
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    height: 25,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  footStyle: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});