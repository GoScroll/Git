import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    DeviceEventEmitter
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";
let url = 'http://47.98.148.58/app/user/uploadHeadPortrait.do';
let URL = "http://47.98.148.58/app/user/showSetting.do";
let ImagePicker = require('react-native-image-picker');
export default class Setting extends Component {
    constructor(props){
        super(props);
        this.utils = new NetUtils;
        this.state={
            text:13613722839,
            Name:"",
            Data:"",
            nickName:"",
            imgUrl:'',
            phoneNum:'',
            isRefresh:false
        }
    }
    static navigationOptions = ({navigation}) => ({

        headerTitle: '设置',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    });
    state = {
        avatarSource: ' ',
        videoSource: ' '
    };
    componentDidMount() {
        DeviceEventEmitter.addListener('NoticeName', (value)=>{
            //这里面是要调用的方法，比如：刷新
            //value:是下面页面在 通知 时 ，所传递过来的参数
            this._onLoad()
        });
        this._onLoad()
    }
    _onLoad(){
        this.utils.fetchNetRepository(URL)
            .then(result => {
                this.setState({
                    nickName:result.data.nickName,
                    imgUrl:result.data.imgUrl,
                    phoneNum:result.data.phoneNum
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            cancelButtonTitle: '取消',
            title: '请选择',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册中选择',
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                /*let source = {uri: response.uri};*/

                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data};

                this.setState({
                    avatarSource: source,
                });
                if(response.data === null){
                }else {
                    this.utils.fetchNetRepository(url,{"base64Str":response.data,"imgName":response.fileName})
                        .then(result => {
                            if (result.code === 0){
                                this._onLoad();
                                DeviceEventEmitter.emit('ChangePic',1);
                            }
                        });
                }
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <TouchableOpacity
                    onPress={this.selectPhotoTapped.bind(this)}
                    style={styles.row1Style}
                >
                    <View style={styles.row2Style}>
                        <View>
                            <Text style={styles.textStyle}>头像</Text>
                        </View>
                        <View style={styles.leftStyle}>
                            <Image source={{uri:this.state.imgUrl}} style={styles.image1Style}/>
                            <Image source={require('../../res/Images/ahead.png')} style={styles.image2Style}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.row3Style}
                    onPress={() => this.props.navigation.navigate('Change_Name')}
                >
                    <View style={styles.row4Style}>
                        <View>
                            <Text style={styles.textStyle}>昵称</Text>
                        </View>
                        <View style={styles.leftStyle}>
                            <Text style={styles.textStyle}>{this.state.nickName}</Text>
                            <Image source={require('../../res/Images/ahead.png')} style={styles.image2Style}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Change_Teltel',{text:this.state.phoneNum})}
                    style={styles.row3Style}
                >
                    <View style={styles.row4Style}>
                        <View>
                            <Text style={styles.textStyle}>手机号</Text>
                        </View>
                        <View style={styles.leftStyle}>
                            <Text style={styles.textStyle}>{this.state.phoneNum}</Text>
                            <Image source={require('../../res/Images/ahead.png')} style={styles.image2Style}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Change_Password')} style={styles.row3Style}>
                    <View style={styles.row4Style}>
                        <View>
                            <Text style={styles.textStyle}>修改密码</Text>
                        </View>
                        <View style={styles.leftStyle}>
                            <Image source={require('../../res/Images/ahead.png')} style={styles.image2Style}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row1Style: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    row2Style: {
        height: ScreenUtils.scaleSize(162),
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ScreenUtils.scaleSize(20),
        marginRight: ScreenUtils.scaleSize(10),
        marginLeft:  ScreenUtils.scaleSize(10),
        alignItems: 'center',
    },
    row3Style: {
        backgroundColor: 'white',
        marginTop: 1,
    },
    row4Style: {
        height:ScreenUtils.scaleSize(88),
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: ScreenUtils.scaleSize(10),
        marginLeft: ScreenUtils.scaleSize(10),
        alignItems: 'center',
    },
    leftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: ScreenUtils.setSpText(17),
        color: 'black',
    },
    image1Style: {
        width: ScreenUtils.scaleSize(130),
        height: ScreenUtils.scaleSize(130),
        borderRadius: ScreenUtils.scaleSize(130/2),
    },
    image2Style: {
        width: ScreenUtils.scaleSize(60),
        height:ScreenUtils.scaleSize(90),
        marginRight: 5
    },
    falanyStyle: {
        paddingLeft: 20,
    }
});

