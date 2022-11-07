import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  FlatList
} from 'react-native';

import { Audio } from 'expo-av';

import Slider from '@react-native-community/slider';

import Ionicon from 'react-native-vector-icons/Ionicons';

import songs from '../model/data.js';

import * as Utils from '../utils/main';
import { Colors, player } from '../styles/main';


const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackObject, setPlaybackObject] = React.useState(null);
  const [playbackStatus, setPlaybackStatus] = React.useState(null);
  const [currentPos, setCurrentPos] = React.useState(0);

  const scrollX = React.useRef(new Animated.Value(0)).current
  const [songIndex, setSongIndex] = React.useState(0);

  const songSlider = React.useRef(null);

  React.useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }

    scrollX.addListener(({ value }) => {
      const index = Math.round(value / Utils.SCREEN_WIDTH);
      setSongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    }
  }, []);

  const navigate = async (isNext) => {
    if (playbackStatus !== null) {
      const status = await playbackObject.unloadAsync();
      setIsPlaying(false);
      return setPlaybackStatus(null);
    }

    isNext ? skipToNext() : skipToPrevious();
  };

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * Utils.SCREEN_WIDTH,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * Utils.SCREEN_WIDTH,
    });
  };

  const handlePlayPause = async (file) => {

    if (playbackObject !== null && playbackStatus === null) {
      try {
        const status = await playbackObject.loadAsync(
          file,
          { shouldPlay: true }
        );

        setIsPlaying(true);
        return setPlaybackStatus(status);
      } catch(err) {
        console.log(err);
      }
    }

    // Pause Audio
    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }

    // Resume Audio
    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={{
        width: Utils.SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={player.coverArtWrapper}>
          <Image
            source={{uri: item.album_cover}}
            style={player.coverArtImage}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={player.container}>
      <View style={player.mainContainer}>
        <View style={{width: Utils.SCREEN_WIDTH}}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {
                contentOffset: {x: scrollX}
              }}],
              {useNativeDriver: true}
            )}
          />
        </View>
        
        <View>
          <Text style={player.title}>{songs[songIndex].title}</Text>
          <Text style={player.artist}>{songs[songIndex].artist}</Text>
        </View>

        <View>
          <Slider
            style={player.progressContainer}
            value={0}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor={Colors.BLUE}
            minimumTrackTintColor={Colors.BLUE}
            maximumTrackTintColor={Colors.WHITE}
            onSlidingComplete={() => {}}
          />
          <View style={player.progressLabelContainer}>
            <Text style={player.progressLabelText}>0:00</Text>
            <Text style={player.progressLabelText}>
              {Utils.getTime(songs[songIndex].duration)}
            </Text>
          </View>
        </View>

        <View style={player.musicControls}>
          <TouchableOpacity onPress={() => {navigate(false)}}>
            <Ionicon
              name="play-skip-back-outline"
              color={Colors.BLUE}
              size={40}
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {handlePlayPause(songs[songIndex].file)}}>
            <Ionicon
              name={isPlaying ? "pause-circle" : "play-circle"}
              color={Colors.BLUE}
              size={85}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigate(true)}}>
            <Ionicon
              name="play-skip-forward-outline"
              color={Colors.BLUE}
              size={40}
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={player.bottomContainer}>
        <View style={player.bottomControls}>
          <TouchableOpacity>
            <Ionicon
              name="heart-outline"
              color={Colors.DARK_GRAY}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon
              name="repeat"
              color={Colors.DARK_GRAY}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon
              name="share-outline"
              color={Colors.DARK_GRAY}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon
              name="ellipsis-horizontal"
              color={Colors.DARK_GRAY}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayer;