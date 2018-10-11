import React, {Component} from 'react';
import {Text, View, Image, StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native';

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
import * as ScreenUtils from "../../Common/ScreenUtils";

export default class Liuyan extends Component {
    static navigationOptions = {
        headerTitle: '意见反馈',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: <View/>
    };
    constructor(props){
        super(props);
        this._onChangeText = this._onChangeText.bind(this);
        this.state = {showValue:"",}
    }
    _onChangeText(inputData){
        this.setState({showValue:inputData});
    };
    judge() {
        if(this.state.showValue === '')
        {
            alert('请输入反馈信息');
        }
        else
        {
            this.props.navigation.pop();
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder='请输入遇到的问题或建议。。。' clearButtonMode='always' underlineColorAndroid='transparent' multiline={true}  onChangeText={this._onChangeText}/>
                <View style={{flexDirection:'row', backgroundColor:'white', width:width, height: ScreenUtils.scaleSize(88), marginTop:ScreenUtils.scaleSize(35),alignItems:'center'}}>
                    <Text style={styles.text}>QQ邮箱:</Text>
                    <TextInput style={styles.textInput2} placeholder='选填，便于我们联系你' clearButtonMode='always' underlineColorAndroid='transparent' maxLength={13}/>
                </View>

                <TouchableOpacity style={styles.button2Style} onPress={this.judge.bind(this)}>
                    <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black',textAlign: 'center'}}>提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    textInput:{
        backgroundColor:'white',
        width:width,
        height:height/4,
        paddingTop:ScreenUtils.scaleSize(10)
    },
    textInput2:{
        backgroundColor:'white',
        marginLeft:ScreenUtils.scaleSize(20),
        width:width*0.6,
        height: ScreenUtils.scaleSize(88),
        paddingTop:ScreenUtils.scaleSize(18),
    },
    text:{
        fontSize:ScreenUtils.setSpText(18),
        marginLeft: ScreenUtils.scaleSize(10),
    },
    button2Style: {
        width: ScreenUtils.scaleSize(690),
        height: ScreenUtils.scaleSize(88),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius:6,
        backgroundColor: '#FFE059',
        marginTop: ScreenUtils.scaleSize(27),
    },

});