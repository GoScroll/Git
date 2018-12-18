import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter,
    StatusBar,
    Platform
} from 'react-native';
import NetUtils from '../../Common/NetUtils';
import * as ScreenUtils from "../../Common/ScreenUtils";
import LoveHeart from "../../Common/LoveHeart";
let {width,height} = Dimensions.get('window');
let url = "http://47.98.148.58/app/dcPublic/showPubNote.do";
let isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);
export default class ReleaseList extends Component {
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
            likeCount: 8,
        }
    }

    release() {
        this.props.navigation.navigate('Release')
    }
    componentDidMount() {
        this.fetch();
        this.listener=DeviceEventEmitter.addListener("Release", ()=>{
            this.fetch();
        })
    }

    componentWillUnmount(){
        this.listener.remove();
    }

    fetch() {
        this.utils.fetchNetRepository(url,
            {"gds_id": null}
        )
            .then((result)=> {
                this.setState({
                    data:result.data,
                });
                console.log(result.data);
                console.log(result.data)
            })
            .catch((error)=> {
                console.log(error);
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
                <TouchableOpacity style={styles.touch} onPress={()=> this.release()}>
                    <Text style={{fontSize:30}}>+</Text>
                </TouchableOpacity>
                {
                    Platform.OS === 'ios' ?
                        <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 20 : 0) : 0, backgroundColor: 'rgb(248,248,248)'}}>
                        </View> : null
                }
            </View>
        )
    };

    _renderItem= ({item}) => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: ScreenUtils.scaleSize(10)}}>
                {/*头像和名字*/}
                {console.log(item)}
                <View style={styles.wrap2}>
                    <View style={{flexDirection: 'row', padding: 5}}>
                        <Image source={{uri: item.user_img}}
                               style={styles.icon2}
                        />
                        <View style={styles.two2}>
                            <Text style={{
                                color: 'black',
                                fontSize: ScreenUtils.setSpText(17),
                            }}>{item.note_title}</Text>
                        </View>
                    </View>
                </View>
                {/*内容*/}
                <View style={styles.content}>
                    <Text
                        ellipsizeMode='tail'
                        style={{width: width, fontSize: ScreenUtils.setSpText(14.5)}}
                    >{item.note_content}</Text>
                </View>
                {console.log(item)}
                {console.log(item.user_img)}
                <View style={styles.imgContent}>
                    <Image
                        style={styles.allImg}
                        source={{uri: item.note_imgs_url}}/>
                </View>
                <View style={styles.countAndLike}>
                    {/*浏览次数*/}
                    <View style={styles.toolStyle}>
                        <View style={{flexDirection:'row'}}>
                            <Image
                                style={{width: ScreenUtils.scaleSize(50), height: ScreenUtils.scaleSize(50)}}
                                source={{uri: 'https://i.loli.net/2018/12/08/5c0b81605da63.png'}}/>
                            <Text style={{fontSize: ScreenUtils.setSpText(15)}}>{item.skim_num}</Text>
                        </View>
                        <LoveHeart size={20} loveColor={'#EE2C2C'} disLoveColor={'gray'} data={item.note_id}/>
                    </View>
                </View>
            </View>
        )
    };

    hasPicture = (has) => {
        if (has) {
            let hasPicture = true;
            if (hasPicture) {
                return (<View style={styles.imgContent}>
                    <Image
                        style={styles.allImg}
                        source={{uri: 'https://i.loli.net/2018/12/08/5c0b8848934fe.jpg'}}/>
                </View>)
            } else {

            }
        } else {
            return null;
        }
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
    two2: {
        justifyContent: 'center',
        paddingLeft: 5,
    },
    wrap2: {
        width: width,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,

    },
    icon2: {
        borderRadius: 8,
        height: ScreenUtils.scaleSize(40),
        width: ScreenUtils.scaleSize(40),
        paddingLeft: 5,
        paddingRight: 10,
    },
    content: {
        width: width,
        backgroundColor: '#ffffff',
        padding:ScreenUtils.scaleSize(10)
    },
    imgContent: {
        width: width,
        height: ScreenUtils.scaleSize(200),
        flexDirection: "row",
        backgroundColor: '#ffffff',
        paddingBottom: ScreenUtils.scaleSize(5)
    },
    allImg: {
        width: ScreenUtils.scaleSize(200),
        height: ScreenUtils.scaleSize(200),
        marginLeft: ScreenUtils.scaleSize(30)
    },
    countAndLike: {
        width:width,
        height:ScreenUtils.scaleSize(68),
        paddingTop:ScreenUtils.scaleSize(10),
        justifyContent:'center',
        backgroundColor: "#ffffff",
    },
    myIcon: {
        width: ScreenUtils.scaleSize(40),
        height: ScreenUtils.scaleSize(40),
        marginLeft: ScreenUtils.scaleSize(10)
    },
    toolStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:width*0.6,
        marginHorizontal: 20,
        marginBottom: 5,
    }
});