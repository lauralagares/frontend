import './style.css';
import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import {useState, useEffect} from 'react';

function Player({accessToken, trackUri}) {

  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null
  return (
    <SpotifyPlayer
    token={accessToken}
    showSaveIcon
    callback={state => {
      if(!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris={ trackUri ? [trackUri] : []}
    />
  )
}

export default Player