import { StyleSheet } from 'react-native';

import * as Utils from '../utils/main';

import * as Colors from './colors';
import typography from './typography';
import player from './musicplayer';


const main = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingTop: Utils.StatusBarHeight,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export { main, typography, player, Colors };