
import {} from '@react-native-community/audio-toolkit';
import {} from '@react-native-community/slider';
import {} from '@react-native-community/viewpager';
import {} from 'i18n-js';
import {} from 'lottie-react-native';
import {} from 'mobx';
import {} from 'mobx-react';
import {} from 'prop-types';
import {} from 'react-dom';
import {} from 'react-native-android-wifi';
import {} from 'react-native-background-job';
import {} from 'react-native-ble-plx';
import {} from 'react-native-camera';
import {} from 'react-native-display';
import {} from 'react-native-encryption-library';
import {} from 'react-native-fs';
import {} from 'react-native-gesture-handler';
import {} from 'react-native-gridview';
import {} from 'react-native-intent-launcher';
import {} from 'react-native-linear-gradient';
import {} from 'react-native-localize';
import {} from 'react-native-qrcode-svg';
import {} from 'react-native-rsa-native';
import {} from 'react-native-sha256';
import {} from 'react-native-svg';
import {} from 'react-native-video';
import {} from 'react-native-virtual-keyboard';
import {} from 'react-native-webview';
import {} from 'react-navigation';
import {} from 'sprintf-js';
import {} from 'tiny-emitter';"use strict";require("react"),require("react-native");var EveCore=_interopRequireWildcard(require("orionos-eve-core")),_resolveAssetSource=require("react-native/Libraries/Image/resolveAssetSource"),_package=require("./package.json");function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}console.log("Platform index start : "+_package.appid);let pluginInfo=new Map,appInfo=JSON.parse(EveCore.AppManager.getAppJson());//修改图片资源加载路径
//图片存储路径：*/{appId}/drawable-* 目录下
appInfo.plugin&&appInfo.plugin.forEach(a=>{console.log("Platform index add plugin : "+a.appid),pluginInfo.set(a.appid,a.path)}),(0,_resolveAssetSource.setCustomSourceTransformer)(a=>{let b=JSON.parse(JSON.stringify(a.asset)),c=b.httpServerLocation,d=c.substring(1,c.indexOf("/assets"));return c=c.replace("/"+d,""),b.httpServerLocation=c,a.asset=b,a.jsbundleUrl=pluginInfo.has(d)?"file://"+pluginInfo.get(d)+"/":"file://"+appInfo.path+"/",a.defaultAsset()});