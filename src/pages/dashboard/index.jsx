import './style.css';
import React from 'react';
import useAuth from '../../useAuth';
import { authContext } from '../../context/auth.context';
import { Container, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from '../../components/trackSearchResult';
import Player from '../../components/player';
import axios from 'axios';
import { useContext } from 'react';
import { themeContext } from '../../context/theme.context';
import { useTranslation} from 'react-i18next';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID
})

function Dashboard() { 

    const [t, i18n] = useTranslation ("global") ;

    const {token, setId} = useContext(authContext); //cojo el token del context

    const {theme} = useContext(themeContext);
    const {fontColor} = useContext(themeContext);

    //const accessToken = useAuth(code); guardo el accessToken en el contexto
    const accessToken = token
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
        setLyrics('');
    };

    useEffect(() => {
        if(!playingTrack) return

        axios.get(`${process.env.REACT_APP_API_URL}/lyrics`, {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })

    }, [playingTrack])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return

        let cancel = false

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    id: track.id,
                    albumUrl: smallestAlbumImage.url

                }
            }))
        })

        return () => cancel = true
    }, [search, accessToken]);

    useEffect(() => {
      axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      }).then((res) =>
      setId(res.data.id))
      .catch((errors) => console.log(errors))
    }, [])
    

  return (
<Container 
className={`d-flex flex-column py-2  fs-5 bg-${theme} text-${fontColor}`}
fluid
style={{height: '92vh'}}>
    <Form.Control
    type='search'
    placeholder={t("input.title")}
    value={search}
    onChange={ e => setSearch (e.target.value) }
    />
    <div className='flex-grow-1 my-2' style={{overflowY: 'auto'}}>
        {searchResults.map(track => (
                <TrackSearchResult 
                track={track} 
                key={track.uri}
                chooseTrack={chooseTrack}
                ></TrackSearchResult>
            ))}
        {searchResults.length === 0 && (
            <div className='text-center fs-3' style={{ whiteSpace: 'pre' }}>
                {lyrics}
            </div>
        )}
    </div>

    <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri}></Player>
    </div>
</Container>
  )
}

export default Dashboard