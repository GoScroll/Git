import React, {Component} from 'react';
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import NetUtils from "../Common/NetUtils";
let url = 'http://47.98.148.58/app/dcPublic/addLikeNumByNoteId.do';

export default class LoveHeart extends Component {
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state = {
            isLove: false,
            loveColor: this.props.loveColor,
            disLoveColor:this.props.disLoveColor,
            data:this.props.data,
            size: this.props.size,
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={()=> this.press()}>
                {
                    this.state.isLove ?
                        <Icon name="heart" size={this.state.size} color={this.state.loveColor} /> :
                        <Icon name="heart-o" size={this.state.size} color={this.state.disLoveColor} />
                }
            </TouchableOpacity>
        )
    }

    press(){
        if (!this.state.isLove) {
            this.setState({isLove: true});
            this.utils.fetchNetRepository(url,
                {noteId:this.state.data});

        }
}
}
