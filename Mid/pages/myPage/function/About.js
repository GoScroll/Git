import React , {Component} from 'react';
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
export default class About extends Component{
    static navigationOptions =
        {
            headerTitle: '关于我们',
            headerTitleStyle:{
                flex:1,
                textAlign: 'center'
            },
            headerRight: <View/>
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={{marginTop:ScreenUtils.scaleSize(200),paddingBottom:ScreenUtils.scaleSize(30),justifyContent:'center',alignItems:'center'}}>
                    <Image style={styles.image} source={require('../../../res/images/icon.png')}/>
                    <Text style={{marginTop:ScreenUtils.scaleSize(50),fontSize: ScreenUtils.setSpText(22)}}>既简借贷 轻松解决燃眉之急</Text>
                    <Text style={{marginTop:ScreenUtils.scaleSize(50),fontSize: ScreenUtils.setSpText(18)}}>Version 1.0</Text>
                </View>
                <View style={{position: 'absolute', bottom: ScreenUtils.scaleSize(50), width:width, justifyContent:'flex-end', alignItems:'center',}}>
                    <Text style={{fontSize: ScreenUtils.setSpText(18)}}>版权所有</Text>
                    <Text style={{fontSize: ScreenUtils.setSpText(16)}}>Copyright @ 2017-2018 MML Rights Reserved</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    image:{
        height:ScreenUtils.scaleSize(160),
        width:ScreenUtils.scaleSize(160),
    }

});