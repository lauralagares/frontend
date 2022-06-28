import './style.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { FaPlay } from 'react-icons/fa';
import { BsSuitHeartFill } from 'react-icons/bs';
import { BsSuitHeart } from 'react-icons/bs';
import { useContext } from 'react';
import { authContext } from '../../context/auth.context';
import axios from 'axios';

function TrackSearchResult({ track, chooseTrack }) {

    const { id } = useContext(authContext);

    const addFavorites = () => {
        const newFavorite = {
            name: id,
            track: track.id,
        }
        axios.post('http://localhost:3001/favorites', newFavorite)
            .then(r => {
                console.log(r)
            })
    }

    function handlePlay() {
        chooseTrack(track);
    }

    return (
        <div
             className='d-flex m-2 align-items-center'
            style={{ justifyContent: 'space-between' }}>
            <div className='d-flex align-items-center'>
                <FaPlay
                    className='play-icon'
                    style={{ cursor: 'pointer' }}
                    onClick={handlePlay}
                ></FaPlay>

                <img src={track.albumUrl} style={{ height: '64px', width: '64px', marginLeft: '10px' }} />
                <div className='d-flex flex-column m-3'>
                    <div className='fw-bold'> {track.title}</div>
                    <div className='text-muted'>{track.artist}</div>
                </div>
            </div>

            <div className='d-flex m-4'>
                <BsSuitHeartFill
                    className='heart-icon'
                    onClick={addFavorites} 
                    style={{ cursor: 'pointer' }}
                ></BsSuitHeartFill>
            </div>
        </div>
    )
}

export default TrackSearchResult