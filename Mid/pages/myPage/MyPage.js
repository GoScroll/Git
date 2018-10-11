/**
 * 我的界面
 */

import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions,Image,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import * as ScreenUtils from "../../pages/Common/ScreenUtils";
import storage from '../Common/StorageConfig';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      textTel:null,
      isLogin: false,
      nickName:"",
      imgUrl:'',
    };
  }

  componentDidMount() {
    let that = this;
    this.listener = DeviceEventEmitter.addListener('textTel', function (textTel) {
      storage.load({
        key:textTel,
        autoSync: true,
        syncInBackground: true,
      }).then((ret)=> {
        that.setState({
          isLogin: true,
          imgUrl: ret.imgUrl,
          nickName: ret.nickName,
          textTel: ret.textTel,
        })
      }).catch((error)=> {
        console.log(error);
      })
    })
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    const {navigation} = this.props;
    return(
        <View style={styles.container}>
          {
            this.state.isLogin ?
                <View style={{flexDirection:'row',height:ScreenUtils.scaleSize(80),backgroundColor:'#FFE059',justifyContent:'space-between'}}>
                  <View/>
                  <View style={{marginLeft:ScreenUtils.scaleSize(90),justifyContent:'center',alignItems: 'center'}}>
                    <Text style={{fontSize:ScreenUtils.setSpText(25),color:'#4A4A4A'}}>我的</Text>
                  </View>
                  <View style={{marginRight:ScreenUtils.scaleSize(20), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting', {textTel: this.state.textTel})}>
                      <Text style={{fontSize:ScreenUtils.setSpText(18)}}>设置</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View style={{height:ScreenUtils.scaleSize(80),backgroundColor:'#FFE059',justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:ScreenUtils.setSpText(25),color:'#4A4A4A'}}>我的</Text>
                </View>
          }
          <ScrollView>
            <View style={{flexDirection:'row',height:ScreenUtils.scaleSize(222),backgroundColor: '#FFE059'}}>
              <View style={{height:ScreenUtils.scaleSize(111), width:ScreenUtils.scaleSize(20) ,marginTop:ScreenUtils.scaleSize(111),backgroundColor:'#FFFFFF'}}/>
              {
                this.state.isLogin ?
                    <View style={{flexDirection: 'row',height:ScreenUtils.scaleSize(222),backgroundColor:'#FFFFFF',flex:1,elevation: 2, shadowColor: 'gray', shadowOffset: {width: 0.5, height: 0.5}, shadowOpacity: 0.4, shadowRadius: 1}}>
                      <View style={{marginLeft:ScreenUtils.scaleSize(30),justifyContent: 'center'}}>
                        {
                          this.state.imgUrl === undefined?
                              <Image style={{width: ScreenUtils.scaleSize(130), height: ScreenUtils.scaleSize(130), borderRadius: ScreenUtils.scaleSize(130 / 2)}} source={require('../../res/images/denglulogo.png')}/>
                              :
                              <Image style={{width: ScreenUtils.scaleSize(130), height: ScreenUtils.scaleSize(130), borderRadius: ScreenUtils.scaleSize(130 / 2)}} source={this.state.imgUrl}/>
                        }
                      </View>

                      <View style={{marginTop:ScreenUtils.scaleSize(40), marginLeft:ScreenUtils.scaleSize(50)}}>
                        <View style={{flexDirection: 'row', marginBottom: ScreenUtils.scaleSize(30)}}>
                          <View style={{width: ScreenUtils.scaleSize(150)}}>
                            <Text numberOfLines={1} style={{fontSize: ScreenUtils.scaleSize(40), fontWeight: 'bold', color:'black'}}>{this.state.nickName}</Text>
                          </View>
                          <Text style={{fontSize: ScreenUtils.scaleSize(40), fontWeight: 'bold', marginLeft:ScreenUtils.scaleSize(36), color:'black'}}>{this.state.textTel}</Text>
                        </View>
                        <Text style={{fontSize: ScreenUtils.setSpText(18), color:'black'}}>既简借贷 轻松解决燃眉之急</Text>
                      </View>
                    </View>
                    :
                    <View style={{flexDirection: 'row',height:ScreenUtils.scaleSize(222),backgroundColor:'#FFFFFF',flex:1,elevation: 2, shadowColor: 'gray', shadowOffset: {width: 0.5, height: 0.5}, shadowOpacity: 0.4, shadowRadius: 1}}>
                      <View style={{marginLeft:ScreenUtils.scaleSize(30),justifyContent: 'center'}}>
                        <Image style={{width: ScreenUtils.scaleSize(130), height: ScreenUtils.scaleSize(130), borderRadius: ScreenUtils.scaleSize(130 / 2)}} source={require('../../res/images/denglulogo.png')}/>
                      </View>

                      <View style={{marginTop:ScreenUtils.scaleSize(40), marginLeft:ScreenUtils.scaleSize(50)}}>
                        <Text style={{fontSize: ScreenUtils.setSpText(18)}}>既简借贷 轻松解决燃眉之急</Text>
                        <TouchableOpacity style={{width: width * 0.45, height: ScreenUtils.scaleSize(80), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE059', borderRadius: width * 0.05, marginTop: ScreenUtils.scaleSize(27), marginBottom: ScreenUtils.scaleSize(27), alignSelf: 'center'}}
                                          onPress={()=>this.props.navigation.navigate('Login')}>
                          <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>登陆/注册</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
              }

              <View style={{height:ScreenUtils.scaleSize(111),width:ScreenUtils.scaleSize(20),marginTop:ScreenUtils.scaleSize(111),backgroundColor:'#FFFFFF'}}/>
            </View>

            <View style={{marginTop:ScreenUtils.scaleSize(30)}}>
              <TouchableOpacity>
                <View style={styles.button}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(28),width: ScreenUtils.scaleSize(38)}} source={require('../../res/images/wodeyaoqing.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>我的邀请</Text>
                    <Image style={styles.ahead} source={require('../../res/images/ahead.png')}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.button}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(42),width: ScreenUtils.scaleSize(36)}} source={require('../../res/images/yaoqingma.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>我的邀请码</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.button}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(40),width: ScreenUtils.scaleSize(40)}} source={require('../../res/images/wodejiangli.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>我的奖励</Text>
                    <Image style={styles.ahead} source={require('../../res/images/ahead.png')}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Help')}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: ScreenUtils.scaleSize(75), marginBottom: ScreenUtils.scaleSize(20)}}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(40),width: ScreenUtils.scaleSize(40)}} source={require('../../res/images/bangzhu.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>常见帮助</Text>
                    <Image style={styles.ahead} source={require('../../res/images/ahead.png')}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('WeiXin')}>
                <View style={styles.button}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(35), width: ScreenUtils.scaleSize(45)}} source={require('../../res/images/weixingongzhonghao.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>微信公众号</Text>
                    <View style={{marginLeft:ScreenUtils.scaleSize(10),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Text style={{fontSize:ScreenUtils.setSpText(17)}}>米米信</Text>
                      <Image style={styles.ahead} source={require('../../res/images/ahead.png')}/>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.button}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(40),width: ScreenUtils.scaleSize(40)}} source={require('../../res/images/shengji.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>版本更新</Text>
                    <Text style={{fontSize:ScreenUtils.setSpText(17),marginRight:10}}>已是最新版本</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('LiuYan')}>
                <View style={styles.button}>
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(40),width: ScreenUtils.scaleSize(40)}} source={require('../../res/images/liuyan.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>给我留言</Text>
                    <Image style={styles.ahead} source={require('../../res/images/ahead.png')}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
                <View style={styles.button} >
                  <View style={styles.left}>
                    <Image style={{height: ScreenUtils.scaleSize(40),width: ScreenUtils.scaleSize(40)}} source={require('../../res/images/guanyu.png')}/>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>关于我们</Text>
                    <Image style={styles.ahead} source={require('../../res/images/ahead.png')}/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {
              this.state.isLogin ?
                  <View style={{marginTop:ScreenUtils.scaleSize(40)}}>
                    <TouchableOpacity style={styles.button2Style} onPress={()=> this.onPress()}>
                      <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black',textAlign: 'center'}}>完全退出</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View/>
            }
          </ScrollView>

        </View>
    )
  }

  onPress() {
    this.setState({isLogin: false});
    this.props.navigation.navigate('Login');
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: ScreenUtils.scaleSize(88),
    marginBottom: ScreenUtils.scaleSize(3),
  },
  left:{
    width: ScreenUtils.scaleSize(72),
    paddingLeft: ScreenUtils.scaleSize(12),
    alignItems: 'center',
  },
  right:{
    width: ScreenUtils.scaleSize(678),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: ScreenUtils.scaleSize(5),
    alignItems: 'center',
  },
  text:{
    fontSize:ScreenUtils.setSpText(17),
  },
  ahead:
      {
        height: ScreenUtils.scaleSize(62),
        width: ScreenUtils.scaleSize(60)
      },
  button2Style: {
    width: ScreenUtils.scaleSize(690),
    height: ScreenUtils.scaleSize(88),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFE059',
    marginTop: ScreenUtils.scaleSize(27),
  },

});


