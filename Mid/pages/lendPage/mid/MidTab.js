/**
 *
 */

import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Mid1 from './Mid1';
import Mid2 from './Mid2';
import Mid3 from './Mid3';
import Mid4 from './Mid4';
import Mid5 from './Mid5';

export default class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:this.props.navigation.state.params.text,
    }
  }

  render() {
    return (
        <TabNavigator style={styles.container}>
          <TabNavigator.Item
              selected={this.state.selectedTab === '床上用品'}
              title= '床上用品'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../../res/images/jieqian.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../../res/images/jieqian2.png')}/>}
              onPress={()=> this.setState({selectedTab:'床上用品'})}
          >
            <Mid1 {...this.props}/>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === '日用品'}
              title= '日用品'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../../res/images/qiandai.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../../res/images/qiandai2.png')}/>}
              onPress={()=> this.setState({selectedTab:'日用品'})}
          >
            <Mid2/>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === '家具'}
              title= '家具'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../../res/images/me.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../../res/images/me2.png')}/>}
              onPress={()=> this.setState({selectedTab:'家具'})}
          >
            <Mid3 {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === '厨卫用品'}
              title= '厨卫用品'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../../res/images/me.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../../res/images/me2.png')}/>}
              onPress={()=> this.setState({selectedTab:'厨卫用品'})}
          >
            <Mid4 {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === '电子电器'}
              title= '电子电器'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../../res/images/me.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../../res/images/me2.png')}/>}
              onPress={()=> this.setState({selectedTab:'电子电器'})}
          >
            <Mid5 {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FAFF',
  },
  titleStyle:{
    fontSize:12,
    color:'gray'
  },
  selectedTitleStyle:{
    color:'black'
  },
  image:{
    width:22,
    height:22
  },
});


