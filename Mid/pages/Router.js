/**
 * 页面导航
 */

import {StackNavigator} from 'react-navigation';
import HomeTabs from './Common/HomeTabs';
import MidTab from './lendPage/mid/MidTab'
import Login from './myPage/Login';
import Register from './myPage/register/Register';
import Prove from './myPage/register/Prove';
import Invite from './myPage/register/Invite';
import Detail from './myPage/register/Detail'
import FindBackPassword from './myPage/forgetPassword/FindBackPassword';
import FindProve from './myPage/forgetPassword/FindProve'
import NewPassword from './myPage/forgetPassword/NewPassword';
import Setting from './myPage/seeting/Setting';
import ChangeName from './myPage/seeting/ChangeName'
import ChangeTel from './myPage/seeting/ChangeTel';
import TelChange from './myPage/seeting/TelChange';
import ChangePassword from './myPage/seeting/ChangePassword';
import ChangeProve from './myPage/seeting/ChangeProve';
import GuidePage from './GuidePage';
import About from './myPage/function/About';
import Help from './myPage/function/Help';
import WeiXin from './myPage/function/Weixin';
import DetailHelp from './myPage/function/DetailHelp';
import LiuYan from './myPage/function/Liuyan';

const router = StackNavigator({
  Home: {
    screen: GuidePage,
    navigationOptions: {
      header: null
    }
  },
  HomeTabs:{
    screen: HomeTabs,
  },
  MidTab: {
    screen: MidTab,
    navigationOptions: {
      header:null,
    }
  },
  Login:{
    screen: Login,
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: '注册'
    }
  },
  Prove: {
    screen: Prove,
    navigationOptions: {
      title: '输入验证码',
    }
  },
  Invite: {
    screen: Invite,
    navigationOptions: {
      title: '输入邀请码',
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      title: '注册'
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      header:null,
    }
  },
  FindBackPassword: {
    screen: FindBackPassword,
    navigationOptions: {
      title: '找回密码',
    }
  },
  FindProve: {
    screen: FindProve,
    navigationOptions: {
      title: '输入验证码',
    }
  },
  NewPassword: {
    screen: NewPassword,
    navigationOptions: {
      title: '新密码'
    }
  },
  ChangeName: {
    screen: ChangeName,
    navigationOptions: {
      header:null,
    }
  },
  ChangeTel: {
    screen: ChangeTel,
    navigationOptions: {
      title: '手机号',
    }
  },
  TelChange: {
    screen: TelChange,
    navigationOptions: {
      title: '修改手机号',
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: '修改密码',
    }
  },
  ChangeProve: {
    screen: ChangeProve,
    navigationOptions: {
      title: '输入验证码'
    }
  },
  About:{
    screen: About,
  },
  Help:{
    screen:Help,
  },
  WeiXin:{
    screen:WeiXin,
  },
  DetailHelp:{
    screen:DetailHelp,
  },
  LiuYan:{
    screen:LiuYan,
  },

});

export default router;
