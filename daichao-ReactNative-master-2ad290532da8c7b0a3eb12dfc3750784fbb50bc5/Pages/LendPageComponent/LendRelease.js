import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import NetUtils from '../Common/NetUtils';
import * as ScreenUtils from "../Common/ScreenUtils";
let {width,height} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/goods/homePage.do';
let Url = 'http://47.98.148.58/app/user/showUserInfo.do';
let isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);
let ChangeURL = "http://47.98.148.58/app/dcPublic/showPubNote.do";
export default class LendRelease extends Component {
    static navigationOptions=({navigation})=> ({
        headerTitle:navigation.state.params.title,
        headerTitleStyle:{
            flex:1,
            textAlign: 'center',
        },
        // headerRight:(
        //     <TouchableOpacity onPress={()=> this.release()}>
        //         <Text style={{fontSize:16}}>发布</Text>
        //     </TouchableOpacity>
        // ),
    });
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state={
            data:'',
            id:this.props.navigation.state.params.id,
            login:false,
        }
    }

    release() {
        this.props.navigation.navigate('Release')
    }
    componentDidMount() {
        this.fetch();
        this.load();
        this.listener=DeviceEventEmitter.addListener("Release", ()=>{
            this.fetch();
        });
        this.listener0=DeviceEventEmitter.addListener("NoticeName", ()=>{
            this.load();
        })
    }

    componentWillUnmount(){
        this.listener.remove();
        this.listener0.remove();
    }

    fetch() {
        this.utils.fetchNetRepository(ChangeURL,
            {"gds_id": this.state.id},
        )
            .then((result)=> {
                this.setState({
                    data:result.data,
                });
                // alert(JSON.stringify(result));
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    load() {
        this.utils.fetchNetRepository(Url)
            .then(result => {
                this.setState({
                    login: result.data.state,
                });
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
                {this.isLoad()}
                {
                    Platform.OS === 'ios' ?
                        <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 20 : 0) : 0, backgroundColor: 'rgb(248,248,248)'}}>
                        </View> : null
                }
            </View>
        )
    };

    isLoad() {
        if (this.state.login) {
            return (
                <TouchableOpacity style={styles.touch} onPress={()=> this.release()}>
                    <Text style={{fontSize:30}}>+</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.touch} onPress={()=> this.props.navigation.navigate('Second')}>
                    <Text style={{fontSize:30}}>+</Text>
                </TouchableOpacity>
            )
        }
    }

    _renderItem= ({item}) => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: ScreenUtils.scaleSize(5)}}>

                <View style={styles.wrap}>
                    <View style={{flexDirection: 'row',  padding: 5,}}>
                        <Image source={{uri: item.note_imgs_url}}
                               style={styles.icon}
                        />
                        <View style={styles.two}>
                            <Text style={{
                                color: 'black',
                                fontSize: ScreenUtils.setSpText(15.5),
                                paddingBottom: 7
                            }}>{item.note_title}</Text>
                            <Text
                                ellipsizeMode='tail'
                                style={{width: width * 0.75, fontSize: ScreenUtils.setSpText(14.5)}}
                            >{item.note_content}</Text>
                        </View>

                    </View>
                </View>
            </View>
        )
    };

    _keyExtractor = (item, index) => index.toString();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ScreenUtils.scaleSize(16)
    },
    row2: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
    },
    touch: {
        marginTop: 10,
        marginBottom:10,
        width:width*0.8,
        height:50,
        backgroundColor:'#FFE059',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    row: {
        height: ScreenUtils.scaleSize(177),
        width: ScreenUtils.scaleSize(730),
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: ScreenUtils.scaleSize(21),
        marginLeft: ScreenUtils.scaleSize(10),
        marginRight: ScreenUtils.scaleSize(10),
    },
    two: {
        justifyContent: 'center',
        paddingLeft: 5,
    },
    wrap: {
        width: width ,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,

    },
    icon: {
        borderRadius: 8,
        height: ScreenUtils.scaleSize(90),
        width: ScreenUtils.scaleSize(90),
        paddingLeft: 5,
        paddingRight: 10,
    },
    ahead: {
        height: ScreenUtils.scaleSize(45),
        width: ScreenUtils.scaleSize(45),
    },
});