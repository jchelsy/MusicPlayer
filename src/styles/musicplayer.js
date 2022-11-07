import { StyleSheet } from 'react-native';

import * as Utils from '../utils/main';


const player = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    paddingTop: Utils.StatusBarHeight,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverArtWrapper: {
    // width: 300,
    // height: 300,
    width: 225,
    height: 225,
    marginBottom: 25,

    elevation: 25,
  },
  coverArtImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
    color: '#EEE',
  },
  artist: {
    paddingTop: 5,
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    fontSize: 16,
    color: '#EEE',
  },
  progressContainer: {
    width: Math.round(Utils.SCREEN_WIDTH * 0.9),
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: Math.round(Utils.SCREEN_WIDTH * 0.9) - 30,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: Utils.SCREEN_WIDTH,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default player;