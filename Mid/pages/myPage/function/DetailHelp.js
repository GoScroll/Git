import React, { Component } from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
import {StackNavigator} from 'react-navigation';

let width=Dimensions.get('window').width;

export default class DetailHelp extends Component{
    static navigationOptions =  ({ navigation }) =>({
        title: navigation.state.params.question,
        headerTitleStyle:{
            flex:1,
            textAlign: 'center',
        },
        headerRight: <View/>
    });
    render(){
        const {navigate}=this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={{marginTop:ScreenUtils.scaleSize(20)}}>
                    <Text style={styles.question}>{this.props.navigation.state.params.question}</Text>
                    <View style={{backgroundColor:'gray',height:1,width:0.9*width,justifyContent:'center',alignSelf:'center'}}/>
                </View>
                <Text style={styles.answer}>{this.props.navigation.state.params.answer}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    question:{
        fontSize:ScreenUtils.setSpText(22),
        color:'black',
        alignSelf: 'center'
    },
    answer:{
        fontSize:ScreenUtils.setSpText(18),
        marginLeft:0.05*width,
        marginTop:ScreenUtils.scaleSize(40)
    },
    wrap:{
        width:width,
        height:ScreenUtils.scaleSize(80),
        paddingTop:ScreenUtils.scaleSize(25),
        paddingBottom:ScreenUtils.scaleSize(25)
    }
});