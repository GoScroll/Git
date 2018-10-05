import React, {Component} from 'react';
import {StyleSheet, View, Image,Text, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import SplashScreen from "rn-splash-screen"
import Swiper from 'react-native-swiper';
import HomeTabs from './Common/HomeTabs';
import storage from './Common/StorageConfig';
let {width, height} = Dimensions.get('window');

export default class GuidePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
        welcome: false,
    }
  }

  componentDidMount() {
    global.setTimeout(()=> {
      this.setState({isLoading: false});
      storage.load({
          key:'welcome',
          autoSync:true,
          syncInBackground: true,
      }).then((ret)=> {
          this.setState({
              welcome: ret,
          })
      }).catch((error)=> {
          console.log(error)
      });
    }, 1000);
  }

  componentDidUpdate() {
    if(!this.state.isLoading){
      SplashScreen.hide();
    }
  }

  render() {
    if(this.state.isLoading){
        return null;
    }else{
      if(this.state.welcome){
        return <HomeTabs/>
      }else {
          return (
              <Swiper
                  style={styles.container}
                  showsButton={true}
                  autoplay={false}
                  paginationStyle={{bottom:30}}
                  loop={false}

              >
                  <Image style={styles.image} source={require('../res/images/page1.png')}/>
                  <Image style={styles.image} source={require('../res/images/page2.png')}/>
                  <ImageBackground style={styles.button} source={require('../res/images/page3.png')}>
                      <TouchableOpacity
                          activeOpacity={1}
                          onPress={()=> this.onPress()}
                          style={styles.touch}
                      >
                          <Text>立即进入</Text>
                      </TouchableOpacity>
                  </ImageBackground>
              </Swiper>
          )
      }
    }
  }

  onPress(){
      this.setState({
          welcome: true,
      });
      storage.save({
          key:'welcome',
          data: true,
      });
  }
}

const styles = StyleSheet.create({
  container:{
  },
  swipe1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
  },
  button: {
    flex: 1,
    width: width,
    height:5,
    alignItems: 'center',
  },
  touch: {
    width: width/2,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    bottom: 36,
    backgroundColor:'#FFE059',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
