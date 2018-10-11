import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
import * as ScreenUtils from "../../Common/ScreenUtils";

export default class Weixin extends Component {
    static navigationOptions = {
        headerTitle: '微信公众号',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: <View/>
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{borderColor:'black', borderWidth:1}}>
                <Image  style={{width: ScreenUtils.scaleSize(655), height: ScreenUtils.scaleSize(655)}} source={require('../../../res/images/二维码边长15cm.jpg')}/>
                <View style={styles.view}>
                    <Image style={{width: ScreenUtils.scaleSize(80), height: ScreenUtils.scaleSize(80),justifyContent:'center',alignSelf:'center'}} source={require('../../../res/images/denglulogo.png')}/>
                    <View style={{marginTop:ScreenUtils.scaleSize(25)}}>
                        <Text style={{fontSize:ScreenUtils.setSpText(18)}}>米米信</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(12)}}>专业解决贷款申请，个人征信问题与您的资金问题。</Text>
                    </View>
                </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignSelf: 'center',

    },
    view:{
        backgroundColor:'gray',
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
        width:ScreenUtils.scaleSize(655),
        height:ScreenUtils.scaleSize(150),
    }
});