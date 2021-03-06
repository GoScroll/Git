/**
 * 屏幕适配工具
 */

import {
  Dimensions,
  PixelRatio,
} from 'react-native';


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例

/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */

export function setSpText(size: number) {
  size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
  return (size / pixelRatio);
}

export function scaleSize(size: Number) {
  return size / 750 * deviceWidth;
}

//用法：
// 导入：import  ScreenUtils from "../pages/Common/ScreenUtils";
// 使用：width:ScreenUtils.scaleSize(14),
