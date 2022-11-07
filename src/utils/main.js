import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

import { SCREEN_WIDTH, SCREEN_HEIGHT } from './dimensions';

function scale(weight) {
  return Math.round(SCREEN_WIDTH / weight);
}

function getTime(total_seconds) {
  minutes = Math.floor(total_seconds / 60);
  seconds = Math.floor(total_seconds) - minutes * 60;

  if (seconds < 10) {
    return "" + minutes + ":0" + seconds;
  } else {
    return "" + minutes + ":" + seconds;
  }
}


export { StatusBarHeight, SCREEN_WIDTH, SCREEN_HEIGHT, scale, getTime };