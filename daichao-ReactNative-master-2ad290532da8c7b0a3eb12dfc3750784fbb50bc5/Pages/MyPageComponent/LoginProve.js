import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    StatusBar, Alert, DeviceEventEmitter,
} from 'react-native';
import NetUtils from "../Common/NetUtils";
import * as ScreenUtil from "../Common/ScreenUtils";
import JPushModule from "jpush-react-native/index";
const {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/dcLoginCheckByCode.do';
export default class LoginProve extends Component{
    static navigationOptions={
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    constructor(props){
        super(props);
        this.netUtils=new NetUtils();
        this.state={
            time:60,
            inputTexts: new Array(6),
            text:'',
            isRight:1,
            editable:true,
            registrationId:''
        }
    }
    static defaultProps={
        duration:1000,
    };
    startTimer(){
        let obj = this;
        this.timer=setInterval(function(){
            if(obj.state.time === 0){
                obj.setState({
                    time:0
                })
            }else{
                obj.setState({
                    time:obj.state.time-1
                })
            }
        },this.props.duration);
    }
    componentDidMount() {
        this.startTimer();

        JPushModule.initPush();
        JPushModule.getRegistrationID((registrationId) => {
            this.setState({
                registrationId:registrationId
            })
        });

    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        this.timer && clearTimeout(this.timer);
    };
    TextAdd(){
        if(this.state.time === 0){
            return <View style={{height:30}}/>
        }else{
            return  <Text style={{marginLeft:20,marginTop:10}}>重新发送{this.state.time}s</Text>
        }
    }
    _renderInputs() {
        let inputs = [];
        const {inputTexts} = this.state;
        for (let i = 0; i < 6; i++) {
            let input = <View style={styles.Inputs}>
                <Text
                    key={i}>
                    {inputTexts[i]}
                </Text>
            </View>;
            inputs.push(input);
        }
        return inputs;
    }
    textLogin(){
        this.netUtils.fetchNetRepository(url,
            {"VerificationCode":this.state.text,"registrationId":this.state.registrationId},
        )
            .then(result => {
                let mResult = result.code;
                this.setState({
                    isRight:mResult
                });
                if (this.state.isRight === 0){
                    Alert.alert(
                        '提示', //提示标题
                        '登录成功', //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                    this.props.navigation.popToTop();
                    DeviceEventEmitter.emit('LoginSuccess',1);
                }
                if (this.state.isRight === 1){
                    Alert.alert(
                        '提示', //提示标题
                        '登录失败', //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                }
            });

    }

    render(){
        const { editable } = this.state;
        const { params } = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <Text style={{paddingTop:15,marginLeft:20,color:'black'}}>验证码已发送至{params.text}</Text>
                <TouchableOpacity
                    style={styles.partOne}
                    onPress={()=>{this.setState({editable:!this.state.editable})}}
                >
                    <View style={styles.partOne}>
                        {editable?<TextInput
                                ref={(ref) => this._input = ref}
                                autoFocus={true}
                                visible={false}
                                style={{height: 1, width: 1}}
                                maxLength={6}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({
                                        inputTexts: Array.from(text),
                                        text:text
                                    });
                                    text.length === 6 && this._input.blur();
                                }}
                                onBlur={()=>{
                                    this.textLogin()
                                }}
                            />:
                            <View/>
                        }
                        {this._renderInputs()}
                    </View>
                </TouchableOpacity>

                {this.TextAdd()}

            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6'
    },
    partOne:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginLeft:20,
        width:width-40,
    },
    Input:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        width:width-150
    },
    textInput:{
        width: ScreenUtil.scaleSize(95),
    },
    Inputs: {
        width: ScreenUtil.scaleSize(95),
        height: ScreenUtil.scaleSize(80),
        justifyContent: 'center',
        alignItems:'center',
        marginHorizontal: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    }
});