/**
 * 登陆界面
 */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, Image, Text, View, TouchableOpacity, Keyboard, Dimensions, Picker, TextInput} from 'react-native';
import * as ScreenUtils from '../Common/ScreenUtils';
import storage from '../Common/StorageConfig';

const {width} = Dimensions.get('window');

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      One: true,
      ColorOne: '#F8D075',
      ColorTwo: '#F1F1F1',
      widthOne:2,
      widthTwo:0.7,
      num: '+86',
      textTel: null,
      password: null,
      havePassWord: null,
      canLogin: 'false',
    }
  }

  inPutText() {
    if(this.state.One){
      return (
          <View>
            <View style={styles.Call}>
              <Picker
                selectedValue={this.state.num}
                onValueChange={(num)=> this.setState({num:num})}
                style={styles.picker}
                mode='dropdown'
                // itemStyle={{height: ScreenUtils.scaleSize(120)}}
              >
                <Picker.Item label='+86' value={'移动'} style={{fontSize: 5}}/>
                <Picker.Item label='+10' value={'联通'} style={{fontSize: 5}}/>
                <Picker.Item label='+00' value={'电信'} style={{fontSize: 5}}/>
              </Picker>
              <TextInput
                placeholder={'输入手机号'}
                maxLength={11}
                underline={true}
                style={{width: width-150, backgroundColor:'white'}}
                underlineColorAndroid={'#F1F1F1'}
                keyboardType={'numeric'}
                onChangeText={(textTel)=> this.setState({textTel})}
              />
            </View>
            <View style={{
              flexDirection:'row',
              backgroundColor:'white',
              borderBottomColor:'gray',
              justifyContent:'center',
              alignItems: 'center'
            }}>
              <Text style={{width: ScreenUtils.scaleSize(90), fontSize: ScreenUtils.setSpText(12), color:'black'}}>密码</Text>
              <TextInput
                  placeholder={'输入密码'}
                  style={{width: width - 180, backgroundColor: 'white', height: 50}}
                  underlineColorAndroid={'#F1F1F1'}
                  keyboardType={'default'}
                  onChangeText={(textPassword) => {this.setState({password:textPassword})}}
                  secureTextEntry={true}
              />
            </View>
              <TouchableOpacity style={styles.touch} onPress={()=> this.press()}>
                <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>登陆</Text>
              </TouchableOpacity>
          </View>
      );
    }
    else {
      return (
          <View>
            <View style={styles.Call}>
              <Picker
                  selectedValue={this.state.num}
                  onValueChange={(num) => this.setState({num: num})}
                  style={styles.picker}
                  mode='dropdown'
                  // itemStyle={{height:ScreenUtils.scaleSize(120)}}
              >
                <Picker.Item label='+86' value={'移动'} style={{fontSize: 5}}/>
                <Picker.Item label='+10' value={'联通'} style={{fontSize: 5}}/>
                <Picker.Item label='+00' value={'电信'} style={{fontSize: 5}}/>
              </Picker>
              <TextInput
                  placeholder={'输入手机号'}
                  maxLength={11}
                  style={{width: width - 150, backgroundColor: 'white'}}
                  underlineColorAndroid={'#F1F1F1'}
                  keyboardType={'numeric'}
                  onChangeText={(textTel)=> this.setState({textTel:textTel})}
              />
            </View>
            <TouchableOpacity style={styles.touch}>
              <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>获取验证码</Text>
            </TouchableOpacity>
            <TouchableOpacity/>
          </View>
      )
    }
  }

  press() {
    storage.load({
      key:JSON.stringify(this.state.textTel),
      autoSync: true,
      syncInBackground: true,
    }).then((ret)=> {
      this.setState({
        havePassWord: ret.password,
        canLogin: 'true',
      })
    }).catch((error)=> {
      alert('该手机号未注册')
    });
    if(this.state.canLogin) {
      if(this.state.havePassWord === this.state.password){
        this.props.navigation.pop();
      }else {
        alert('请输入正确密码')
      }
    }else {
      alert('不能登陆')
    }
  }

  LoginSwitchOne() {
    this.setState({
      ColorOne: '#F8D075',
      ColorTwo: '#F1F1F1',
      widthOne: 2,
      widthTwo: 0.7,
      One: true
    })
  }

  LoginSwitchTwo() {
    this.setState({
      ColorOne: '#F1F1F1',
      ColorTwo: '#F8D075',
      widthOne: 0.7,
      widthTwo: 2,
      One: false,
    })
  }

  render() {
    return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          onPress={()=> Keyboard.dismiss()}
        >
          {/*<StatusBar*/}
          {/*backgroundColor='white'*/}
          {/*/>*/}
          <Image source={require('../../res/images/denglulogo.png')} style={styles.Img}/>
          <View style={styles.One}>
            <TouchableOpacity
              onPress={()=>this.LoginSwitchOne()}
              style={[styles.TouchOne, { borderBottomColor: this.state.ColorOne, borderBottomWidth: this.state.widthOne}]}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(17), color: 'black'}}>账号登陆</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> this.LoginSwitchTwo()}
              style={[styles.TouchTwo,{borderBottomColor: this.state.ColorTwo, borderBottomWidth: this.state.widthTwo}]}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(17), color:'black'}}>短信登陆</Text>
            </TouchableOpacity>
          </View>

          {this.inPutText()}

          <View style={{flexDirection:'row', justifyContent:'center', marginTop: ScreenUtils.scaleSize(24)}}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('FindBackPassword')}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(14)}}>忘记密码</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={() => this.props.navigation.navigate('Register')}
            ><Text style={{paddingLeft: 200, fontSize: ScreenUtils.setSpText(14)}}>新用户注册</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  Img: {
    height: ScreenUtils.scaleSize(160),
    width: ScreenUtils.scaleSize(160),
    borderRadius: ScreenUtils.scaleSize(40),
    marginTop: ScreenUtils.scaleSize(120),
    marginBottom: ScreenUtils.scaleSize(60)
  },
  One: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: ScreenUtils.scaleSize(40)
  },
  TouchOne: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenUtils.scaleSize(240)
  },
  TouchTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ScreenUtils.scaleSize(100),
    width: ScreenUtils.scaleSize(240)
  },
  Call: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    borderBottomColor: 'gray',
    backgroundColor: 'white',
    marginBottom: ScreenUtils.scaleSize(10),
    height: ScreenUtils.scaleSize(120),
  },
  touch: {
    backgroundColor: '#FFE059',
    borderRadius: ScreenUtils.scaleSize(10),
    width: width - 60,
    height: ScreenUtils.scaleSize(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ScreenUtils.scaleSize(40)
  },
  picker: {
    width: ScreenUtils.scaleSize(150),
  },
  warnStyle:{
    color:'red',
    fontSize:ScreenUtils.setSpText(5)
  }
});
