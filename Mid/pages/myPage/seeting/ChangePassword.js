import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, DeviceEventEmitter} from 'react-native';
const {width} = Dimensions.get('window');
import storage from '../../Common/StorageConfig';

export default class ChangePassword extends Component{
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
      newPassword: '',
      conPassword: '',
      textTel: '',
      imgUrl:'',
      nickName:'',
    }
  }

  componentDidMount() {
    storage.load({
      key:JSON.stringify(this.props.navigation.state.params.textTel),
      autoSync: true,
      syncInBackground: true,
    }).then((ret)=> {
      this.setState({
        textTel: ret.textTel,
        imgUrl: ret.imgUrl,
        nickName: ret.nickName,
      })
    }).catch((error)=> {
      console.log(error);
    })
  }

  render() {
    return(
        <View style={styles.container}>
          <View style={styles.Row1}>
            <View style={styles.pasStyle}>
              <Text style={styles.pasText}>新密码</Text>
            </View>
            <TextInput
                placeholder={'输入新密码'}
                maxLength={11}
                style={styles.textInput}
                underlineColorAndroid={'transparent'}
                keyboardType={'default'}
                onChangeText={(text)=> this.setState({newPassword: text})}
            />
          </View>
          <View style={styles.Row2}>
            <View style={styles.pasStyle}>
              <Text style={styles.pasText}>确认密码</Text>
            </View>
            <TextInput
                placeholder={'输入新密码'}
                maxLength={11}
                style={styles.textInput}
                underlineColorAndroid={'transparent'}
                keyboardType={'default'}
                onChangeText={(text)=>this.setState({conPassword:text})}
            />
          </View>
          <TouchableOpacity style={styles.touch} onPress={()=> this.onPress()}>
            <Text butText>完成</Text>
          </TouchableOpacity>
        </View>
    )
  }

  onPress() {
    if(this.state.newPassword === this.state.conPassword) {
      storage.save({
        key: JSON.stringify(this.props.navigation.state.params.textTel),
        data: {
          textTel: this.state.textTel,
          password: this.state.newPassword,
          imgUrl: this.state.imgUrl,
          nickName: this.state.nickName,
        }
      });
      DeviceEventEmitter.emit('textTel', this.props.navigation.state.params.textTel);
      this.props.navigation.navigate('Setting');
    }else {
      alert('请确认密码相同')
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  Row1: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  pasStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    backgroundColor: 'white',
  },
  pasText: {
    color: 'black',
    fontSize: 15,
  },
  textInput: {
    width: width-70,
    height: 50,
    backgroundColor: 'white',
  },
  Row2: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 40
  },
  butText: {
    fontSize: 19,
    color: 'black',
  },
  touch: {
    width: width-60,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FFE059',
  }
});
