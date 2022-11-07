import { StyleSheet } from 'react-native';

import * as Utils from '../utils/main';


const typography = StyleSheet.create({
  title: {
    fontSize: Utils.scale(10),
    fontWeight: 'bold',
  },
  button: {
    fontFamily: 'Roboto-BoldItalic',
    fontSize: Utils.scale(20),
  },
});

export default typography;