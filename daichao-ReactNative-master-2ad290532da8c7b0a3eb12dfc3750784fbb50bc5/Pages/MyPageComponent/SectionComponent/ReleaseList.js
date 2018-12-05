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
                console.log(result.data.note_imgs_url)
                console.log(result.data.note_title)
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
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: ScreenUtils.scaleSize(5)}}>

                <View style={styles.wrap}>
                    <View style={{flexDirection: 'row', padding: 5}}>
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
        paddingLeft: 5
    },
    wrap: {
        width: width,
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