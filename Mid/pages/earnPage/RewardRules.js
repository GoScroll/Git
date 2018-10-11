import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";
let CookieManager = require('react-native-cookies');
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

export default class RewardRulesPage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: params ? params.title : this.props.title,
            headerTitleStyle:{
                flex:1,
                textAlign: 'center',
            },
            headerRight:(
                <View>
                </View>
            ),
            headerStyle:{
                marginTop: StatusBar.currentHeight,
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={this._header}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
    _header=()=>{
        return <View style={styles.container}>

            <View style={styles.row2Style}>
                <View>
                    <View style={styles.TopStyle}></View>
                    <View style={styles.BottomStyle}></View>
                </View>
                <View style={styles.centerStyle}>
                    <View style={{paddingLeft: ScreenUtils.scaleSize(30)}}>
                        <Text style={styles.nameStyle}>奖励规则</Text>
                        <View style={{
                            flexDirection: 'column',
                            marginBottom: ScreenUtils.scaleSize(20)
                        }}>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(18),
                                color: '#333333',
                                }}
                            >1.参与方式</Text>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(15),
                                color: '#333333',
                                }}
                            >通过“一呼百应 邀请有奖”活动邀请好友</Text>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(18),
                                color: '#333333',
                                }}
                            >2.奖励规则</Text>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(15),
                                color: '#333333',
                                }}
                        >您的一个好友注册时填写了你的专属邀请码，你将获得1个积分。累计积分满10分则可以兑换与积分等价值的奖励金（暂定为一个积分 = 1元钱，最终解释权归官方所有）</Text>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(18),
                                color: '#333333',
                                }}
                            >3.奖励结果查询入口</Text>
                            <Text
                            style={{
                            fontSize: ScreenUtils.setSpText(15),
                            color: '#333333',
                            }}
                        >“我的->我的奖励->奖励明细”查看奖励结果
                            </Text>
                        </View>
                        <Text style={styles.nameStyle}>积分兑换</Text>
                        
                        <Image source={require('../../res/Images/icon.png')} style={styles.imageStyle}/>

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: ScreenUtils.scaleSize(20)
                        }}>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(15),
                                color: '#333333',
                                }}
                            >天猫现金券50元</Text>
                        </View>


                        <Text style={styles.nameStyle}>积分兑换</Text>
                        
                        <Image source={require('../../res/Images/icon.png')} style={styles.imageStyle}/>

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: ScreenUtils.scaleSize(20)
                        }}>
                            <Text
                                style={{
                                fontSize: ScreenUtils.setSpText(15),
                                color: '#333333',
                                }}
                            >京东购物卡10元</Text>
                        </View>


                    </View>
                   
 
                </View>


                <View>
                    <View style={styles.TopStyle}></View>
                    <View style={styles.BottomStyle}></View>
                </View>
            </View>

            
            <View style={styles.row3Style}></View>

        </View>
    }

}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F3F4F6'
        },
        row1Style: {
            height: ScreenUtils.scaleSize(80),
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#FFE059',
            alignItems: 'center'
        },
        MeStyle: {
            textAlign: 'center',
            textAlignVertical: 'center',
            flex: 1,
            height: ScreenUtils.scaleSize(60),
            fontSize: ScreenUtils.setSpText(25),
            color: '#4A4A4A',
            paddingLeft: ScreenUtils.scaleSize(100)
        },
        settingStyle: {
            width: ScreenUtils.scaleSize(120),
            height: ScreenUtils.scaleSize(40),
            fontSize: ScreenUtils.setSpText(18)
        },
        row2Style: {
            flexDirection: 'row',
        },
        TopStyle: {
            backgroundColor: '#FFE059',
            width: width * 0.03,
            height: ScreenUtils.scaleSize(92.5),
        },
        centerStyle: {
            height: ScreenUtils.scaleSize(height * 1.5),
            width: width * 0.94,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            elevation: 2,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
        },
        BottomStyle: {
            backgroundColor: 'white',
            width: width * 0.03,
            height: ScreenUtils.scaleSize(129.5),
        },
        imageStyle: {
            width: ScreenUtils.scaleSize(130),
            height: ScreenUtils.scaleSize(130),
            borderRadius: ScreenUtils.scaleSize(130 / 2),
        },
        nameStyle: {
            fontSize: ScreenUtils.setSpText(18),
            fontWeight: '600',
            color: '#333333',
            width: ScreenUtils.scaleSize(150)
        },
        row3Style: {
            height: 25,
            backgroundColor: 'white',
        },
        buttonStyle: {
            width: width * 0.45,
            height: ScreenUtils.scaleSize(80),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFE059',
            borderRadius: width * 0.05,
            marginTop: ScreenUtils.scaleSize(27),
            marginBottom: ScreenUtils.scaleSize(27),
            alignSelf: 'center',
        },
        button2Style: {
            width: ScreenUtils.scaleSize(690),
            height: ScreenUtils.scaleSize(88),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFE059',
            marginTop: ScreenUtils.scaleSize(27),
            marginBottom: ScreenUtils.scaleSize(27),
            alignSelf: 'center',
        },
        rowStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            height: ScreenUtils.scaleSize(88),
            marginBottom: ScreenUtils.scaleSize(3),
        },
        row5Style: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            height: ScreenUtils.scaleSize(75),
            marginBottom: ScreenUtils.scaleSize(20),
        },

        leftStyle: {
            width: ScreenUtils.scaleSize(72),
            paddingLeft: ScreenUtils.scaleSize(12),
            alignItems: 'center',
        },
        icon01: {
            height: ScreenUtils.scaleSize(40),
            width: ScreenUtils.scaleSize(40),
        },
        icon03: {
            height: ScreenUtils.scaleSize(28),
            width: ScreenUtils.scaleSize(36),
        },
        icon02: {
            height: ScreenUtils.scaleSize(60),
            width: ScreenUtils.scaleSize(60),
        },
        icon02t: {
            fontSize:ScreenUtils.setSpText(17)
        },
        icon04: {
            height: ScreenUtils.scaleSize(35),
            width: ScreenUtils.scaleSize(45),
        },
        icon05: {
            height: ScreenUtils.scaleSize(40),
            width: ScreenUtils.scaleSize(34),
        },
        rightStyle: {
            width: ScreenUtils.scaleSize(678),
            flexDirection:
                'row',
            justifyContent:
                'space-between',
            paddingLeft: ScreenUtils.scaleSize(5),
            alignItems: 'center',
        },
        listFont:{
            fontSize:ScreenUtils.setSpText(17)
        }
    })
;


