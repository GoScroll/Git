import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ToastAndroid
} from 'react-native';
import Title from './Title';
import Report from '../../res/json/ReportData';
import { ActionSheet } from 'antd-mobile-rn';
import * as ScreenUtils from "../Common/ScreenUtils";
import ScrollVertical from './scroll_vertical';
let width = Dimensions.get('window');
let height = Dimensions.get('window');

let array = [{ content: '' }];

export default class EarnPage extends Component{
    constructor(props: any) {
        super(props);
        this.state = {
            url: 'www.mimilai.com'
        };
    }


    showShareActionSheet(){
        const opts: any = {
          message: this.state.url,
          title: '分享到',
        };
    
        ActionSheet.showShareActionSheetWithOptions(
          opts,
          (error: any) => alert(error),
          (success: any, method: any) => {
            let text;
            if (success) {
                ToastAndroid.showWithGravity('分享成功', 1000, ToastAndroid.CENTER);
            }
          },
        );
    }

    showRewardRules(){
        this.props.navigation.push(
            'RewardRules',
            {
              'title': '奖励规则'
            }
        )
        // ToastAndroid.showWithGravity('这里是奖励规则，修改这里的代码', 1000, ToastAndroid.CENTER);
        // this.props.navigation.push(
        //     'NewsDetail',
        //     {
        //       'title': '详情',
        //       'url': 'www.baidu.com'
        //     }
        // )
        // 这里修改为打开奖励规则的web
    }

    render(){
        if (Report && Report.length > 0) {
            array = [];
            for (let item of Report) {
                array.push({ content: item.title});
            }
        }
        return(
            <View style={styles.container}>
                <Title/>
                <FlatList
                    ListHeaderComponent={this._header}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

    // <ScrollVertical
    // onChange={(index => {
    //     this.index = index;
    // })}
    // enableAnimation={true}
    // data={array}
    // delay={2500}
    // duration={1000}
    // scrollHeight={34}
    // scrollStyle={styles.reportText}
    // textStyle={{ fontSize: ScreenUtils.setSpText(15) }} />

    // 此段代码替换米米快报

    _header=()=>{
        return <View style={styles.container2}>
            <Image resizemode={'contain'} style={styles.image} source={require('../../res/Images/banner3.png')}/>
            <View style={styles.crow}>
                <TouchableOpacity style={styles.rowStyle}>
                    <View style={styles.rightStyle}>
                        <Image style={{width:ScreenUtils.scaleSize(122),height:ScreenUtils.scaleSize(32)}} source={require('../../res/Images/米米快报.png')}/>
                        <Text style={{paddingTop:ScreenUtils.scaleSize(19),paddingBottom:ScreenUtils.scaleSize(19),paddingLeft:ScreenUtils.scaleSize(13),color:'red',fontSize:ScreenUtils.setSpText(15)}}>恭喜</Text>
                        <Text numberOfLines={1}
                              ellipsizeMode='tail'
                              style={styles.reportText}
                        >{Report[0].text}</Text>
                        <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.wrap}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.text1Style}>邀请好友，注册米米贷赢京东、天猫购物卡</Text>
                </View>
                <View style={styles.row2Style}>
                    <Text style={styles.text1Style}>最高一次可获得</Text>
                    <Text style={styles.redTextStyle}>66元</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../../res/Images/yaoqinghaoyou.png')} style={styles.imageStyle}/>
                </View>
                <TouchableOpacity onPress={()=>this.showRewardRules()} style={{alignItems:'center'}}>
                    <Text style={styles.buttonTextStyle}>点击查看奖励规则 ></Text>
                </TouchableOpacity>
                <View style={{alignItems:'center' , marginTop:ScreenUtils.scaleSize(27)}}>
                    <Text style={styles.text1Style}>立即注册 -> 邀请好友 -> 领奖啦</Text>
                </View>
                <View style={styles.textStyle}>
                    <Text style={{fontSize:ScreenUtils.setSpText(17),color:'#E5E5E5'}}>-----------------马上邀请好友得奖励-----------------</Text>
                </View>
                <View style={styles.otherImageStyle}>
                    <TouchableOpacity
                        onPress={()=>this.showShareActionSheet()}
                    >
                        <Image source={require('../../res/Images/weixin.png')} style={styles.iconStyle}/>
                        <View style={styles.shareButton}>
                            <Text>微信</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.showShareActionSheet()}
                    >
                        <Image source={require('../../res/Images/pengyouquan.png')} style={styles.iconStyle}/>
                        <View style={styles.shareButton}>
                            <Text>朋友圈</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.showShareActionSheet()}
                    >
                        <Image source={require('../../res/Images/QQ.png')} style={styles.iconStyle}/>
                        <View style={styles.shareButton}>
                            <Text>QQ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.showShareActionSheet()}
                    >
                        <Image source={require('../../res/Images/qqkongjian.png')} style={styles.iconStyle}/>
                        <View style={styles.shareButton}>
                            <Text>QQ空间</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6'
    },
    container2:{
        /*height:0.6*height,*/
        backgroundColor:'#F3F4F6'
    },
    text:{
        flexDirection:'column',
        height:40,
        marginTop:6
    },
    picandtxt:{
        flexDirection:'row',
    },
    smallimage:{
        height:16,
        width:16
    },
    invite:{
        flexDirection:'row',
    },
    image:{
        width:ScreenUtils.scaleSize(750),
        height:ScreenUtils.scaleSize(280)
    },
    crow:{
        height:ScreenUtils.scaleSize(70),
        width:ScreenUtils.scaleSize(730),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        flexDirection:'column',
        marginTop:5,
        marginLeft:5,
        marginRight:5,
    },
    rowStyle:{
        height:ScreenUtils.scaleSize(70),
        width:ScreenUtils.scaleSize(730),
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:ScreenUtils.scaleSize(16),
        marginBottom:ScreenUtils.scaleSize(20),
    },
    rightStyle:{
        height:ScreenUtils.scaleSize(70),
        width:width*0.92,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:ScreenUtils.scaleSize(10)
    },
    icon02:{
        height:ScreenUtils.scaleSize(50),
        width:ScreenUtils.scaleSize(56),
        marginBottom:ScreenUtils.scaleSize(25),
        marginLeft:ScreenUtils.scaleSize(20)
    },
    wrap: {
        flex: 1,
        backgroundColor:'#FFFFFF',
        height:ScreenUtils.scaleSize(880),
        borderRadius:ScreenUtils.scaleSize(16),
        marginTop:ScreenUtils.scaleSize(27),
        marginLeft:ScreenUtils.scaleSize(10),
        marginRight:ScreenUtils.scaleSize(10),
    },
    text1Style:{
        fontSize:ScreenUtils.setSpText(18),
        fontWeight:'bold',
        color:'#333333'
    },
    redTextStyle:{
        fontSize:ScreenUtils.setSpText(20),
        fontWeight:'bold',
        color:'#F15A1D'
    },
    row2Style:{
        flexDirection:'row',
        justifyContent:'center',
    },
    buttonTextStyle:{
        marginTop:ScreenUtils.scaleSize(15),
        fontSize:ScreenUtils.setSpText(20),
        fontWeight:'bold',
        color:'orange'
    },
    otherImageStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:ScreenUtils.scaleSize(10),
    },
    imageStyle:{
        height:ScreenUtils.scaleSize(276),
        width:ScreenUtils.scaleSize(370),
        marginTop:ScreenUtils.scaleSize(15),
        marginBottom:ScreenUtils.scaleSize(20),
    },
    iconStyle:{
        width:ScreenUtils.scaleSize(100),
        height:ScreenUtils.scaleSize(100),
        borderRadius:ScreenUtils.scaleSize(53),
    },
    textStyle:{
        alignItems:'center',
        marginTop:ScreenUtils.scaleSize(33),
        marginBottom:ScreenUtils.scaleSize(10),
    },
    title:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    reportText:{
        fontSize:ScreenUtils.setSpText(16),
        paddingLeft:ScreenUtils.scaleSize(6),
        width:width*0.6,
    },
    shareButton: {
        alignItems:'center'
    }

});