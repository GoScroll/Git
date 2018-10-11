import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Dimensions, Keyboard} from 'react-native';
const {width} = Dimensions.get('window');
import storage from '../../Common/StorageConfig';

export default class Detail extends Component{
  static navigationOptions={
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      nickName: null,
      password1: '',
      password2: '',
      textTel: this.props.navigation.state.params.textTel,
    }
  }

  render() {
    return (
       <TouchableOpacity style={styles.container} activeOpacity={1} onPress={()=> Keyboard.dismiss()}>
         <View style={styles.partOne}>
           <Image source={require('../../../res/images/icon.png')} style={styles.Img}/>
           <View style={styles.partTwo}>
             <TextInput
                 placeholder={'昵称'}
                 style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                 underlineColorAndroid={'transparent'}
                 keyboardType={'default'}
                 onChangeText={(nickName)=>{this.setState({nickName:nickName})}}
             />
             <TextInput
                 placeholder={'密码'}
                 style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                 underlineColorAndroid={'transparent'}
                 keyboardType={'default'}
                 secureTextEntry={true}
                 onChangeText={(password)=>{this.setState({password1:password})}}
             />
             <TextInput
                 placeholder={'确认密码'}
                 style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                 underlineColorAndroid={'transparent'}
                 keyboardType={'default'}
                 secureTextEntry={true}
                 onChangeText={(password)=>{this.setState({password2:password})}}
             />
           </View>
           <TouchableOpacity onPress={()=> this.press()} style={styles.touch}>
             <Text style={{fontSize:19,color:'black'}}>完成</Text>
           </TouchableOpacity>

           <View style={styles.partThree}>
             <Text>点击完成，表示你已同意</Text>
             <TouchableOpacity onPress={()=> {}}>
               <Text style={{color: 'blue'}}>《米米来用户协议》</Text>
             </TouchableOpacity>
           </View>
         </View>
       </TouchableOpacity>
    );
  }

  press() {
    if(this.state.nickName !== null) {
      if(this.state.password1 === this.state.password2){
        storage.save({
          key:JSON.stringify(this.state.textTel),
          data: {
            textTel: this.state.textTel,
            nickName: this.state.nickName,
            password: this.state.password1,
          }
        });
        this.props.navigation.navigate('Login',{textTel: this.state.textTel})
      }else {
        alert('请确认密码相同')
      }
    }else {
      alert('请填写您的昵称')
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  partOne: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Img: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
    marginTop: 15,
  },
  partTwo: {
    marginTop: 40,
    paddingTop: 5,
  },
  touch: {
   width: width-60,
    height:50,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE059',
  },
  partThree: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  }
});
