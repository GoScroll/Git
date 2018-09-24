/**
 * 页面导航
 */

import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeTabs from './Common/HomeTabs';

const router = StackNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      header: null
    }
  }
});

export default router;
