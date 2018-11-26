import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    Keyboard,
    Image,
    DeviceEventEmitter,
} from 'react-native';
import ImagePicker from 'react-native-image-picker' ;
import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from "../../Common/NetUtils";
import Icon1 from "react-native-vector-icons/Ionicons";
let url = 'http://47.98.148.58/app/dcPublic/publishNote.do';
let {width, height} = Dimensions.get('window');
let isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);
let options = {
    title:'请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};

export default class Release extends Component {
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state = {
            imgName: null,
            noteTilte: '',
            noteContent:'',
            fieldName:'',
        }
    }

    _complete() {
        this.props.navigation.pop();
    };
    onLoad(){
        this.utils.fetchNetRepository(url,
            {
                "imgMap":this.state.imgName,
                "imgName":this.state.fieldName,
                "noteTilte":this.state.noteTilte,
                "noteContent":this.state.noteContent,
            }
        )
            .then(result => {
                console.log(result);
                if(result.code===0){
                    Alert.alert(
                        '提示', //提示标题
                        "发布成功", //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                    DeviceEventEmitter.emit("Release", 1);
                    this._complete();
                }else {
                    Alert.alert(
                        '提示', //提示标题
                        "发布失败", //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                }
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}
                onPress={()=>Keyboard.dismiss()}
            >
                <StatusBar
                    backgroundColor='white'
                />
                {
                    Platform.OS === 'ios' ?
                        <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 40 : 20) : 0, backgroundColor: '#FFE059'}}>
                        </View> : null
                }
                <View style={styles.NavBar}>
                    <TouchableOpacity
                        style={{flexDirection:'row', alignItems: 'center', marginLeft: 16, height: 25,}}
                        onPress={() => this.props.navigation.pop()}>
                        <Icon1 name="ios-arrow-back" size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text style={{color:'black',fontSize:ScreenUtils.setSpText(18), fontWeight: 'bold'}}>我要发布</Text>
                    <TouchableOpacity
                        onPress={()=> this.onLoad()}
                    >
                        <Text style={{color:'black',fontSize:ScreenUtils.setSpText(18),marginRight:ScreenUtils.scaleSize(25)}}>发布</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'white'}}>
                    <TextInput
                        style={styles.textInputTitle}
                        placeholder='标题'
                        clearButtonMode='always'
                        underlineColorAndroid='transparent'
                        multiline={true}
                        onChangeText={(title) => {
                            this.setState({
                                noteTilte:title
                            })
                        }}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='想说点什么...'
                        clearButtonMode='always'
                        underlineColorAndroid='transparent'
                        multiline={true}
                        onChangeText={(content) => {
                            this.setState({
                                noteContent:content
                            })
                        }}
                    />
                    <View  style={styles.textInputStyle}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            {
                                this.state.imgName === null ? <View/> : <Image style={styles.headPhoto} source={this.state.imgName}/>
                            }
                            <TouchableOpacity style={styles.headPhotoStyle} activeOpacity={1} onPress={()=> this.openMyCamera()}>
                                <Text style={styles.imgText}>添加图片</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button2Style}
                    onPress={()=> this.onLoad()}
                >
                    <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>发布</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    openMyCamera= ()=> {
        ImagePicker.showImagePicker(options, (response => {
            if (response.didCancel) {
                console.log('用户点击了取消');
            } else if (response.error) {
                console.log('ImagePicker发生错误:'+response.error)
            } else {
                let source = {uri: 'data:image/jpeg;base64,' + response.data};
                this.setState({
                    imgName: source,
                    fieldName:response.fileName,
                })
            }
        }))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F5FFFA',
    },
    textInputTitle: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 10,
    },
    textInputStyle: {
        backgroundColor: 'white',
        height: height / 4,
        marginHorizontal: 10,
    },
    button2Style: {
        width: ScreenUtils.scaleSize(690),
        height: ScreenUtils.scaleSize(88),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#FFE059',
        marginTop: ScreenUtils.scaleSize(27),
        marginBottom: ScreenUtils.scaleSize(27),
        alignSelf: 'center',
    },
    NavBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:60,
        backgroundColor: 'white',
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        paddingTop:10,
    },
    imgText: {
        fontSize: 16,
        color: 'gray',
        marginTop:10,
        marginLeft: 10,
    },
    headPhoto: {
        height: 100,
        width: 100,
    },
    headPhotoStyle: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor:'#EDEDED',
    },
    textStyle: {
        fontSize: 14,
        color: 'black',
        marginVertical: 10,
    },
});