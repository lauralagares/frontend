import React from 'react';
import { Container } from 'react-bootstrap';
import { themeContext } from '../../context/theme.context';
import Player from '../../components/player';
import { useContext } from 'react';
import { authContext } from '../../context/auth.context';
import {  useState, useEffect } from 'react';
import axios from 'axios';
import TrackFavorites from '../../components/trackFavorites';

function Favorites() { 

  const { token, id } = useContext(authContext);;
  // console.log(token, 'hola');
  const accessToken = token

  // sessionStorage.setItem('token', token);

  const { theme } = useContext(themeContext);
  const { fontColor } = useContext(themeContext);

  const [favorites, setFavorites] = useState([]);
  const [reload, setreload] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();
  // const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
      setPlayingTrack(track);
      // setFavorites('');
      // setLyrics('');
  };

  const getAllFavorites = async () => { 
    const r = await axios.get(`${process.env.REACT_APP_API_URL}/favorites?id=${id}`)
    const tracksId = r.data.tracks.join(',');
    const fav = await axios.get(`https://api.spotify.com/v1/tracks?ids=${tracksId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(fav.data.tracks)
    setFavorites(fav.data.tracks)
  }

  useEffect(() => {
    getAllFavorites();
  }, [reload])


const deleteFavorites = (idTrack) => {
  const newDelete = {
      name: id,
      track: idTrack,
  }
  axios.delete(`${process.env.REACT_APP_API_URL}/favorites?name=${newDelete.name}&track=${newDelete.track}`)
      .then(r => {
          console.log(r)
          setreload(!reload);
      })
}

  return (

    <Container fluid
      className={` d-flex flex-column py-2 fs-5 bg-${theme} text-${fontColor}`}
      style={{ height: '91vh' }}>
      <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
        {favorites.map((track) =>
            <TrackFavorites
            key={track.id} 
            track={track}
            chooseTrack={chooseTrack}
            deleteFavorites={deleteFavorites}
            ></TrackFavorites>
          )}
      </div>
      <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}></Player></div>
    </Container>
  )
}

export default Favorites