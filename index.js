/**
 * @format
 */

import App from './src/App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import i18n from '@/config/i18n';

AppRegistry.registerComponent(appName, () => App);
