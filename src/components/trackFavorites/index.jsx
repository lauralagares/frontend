import React from 'react'
import { FaPlay } from 'react-icons/fa';
import { FcFullTrash } from 'react-icons/fc';
import './style.css'


function TrackFavorites({ track, chooseTrack, deleteFavorites }) {

  function handlePlay() {
    chooseTrack(track);
  }

  const handleDelete = () => {
    deleteFavorites(track.id);
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

        <img src={track.album.images[0].url} style={{ height: '64px', width: '64px', marginLeft: '10px' }} />
        <div className='d-flex flex-column m-3'>
          <div className='fw-bold'> {track.name}</div>
          <div className='text-muted'>{track.artists[0].name}</div>
        </div>
      </div>

      <div 
        onClick={handleDelete}
        className='me-4'><FcFullTrash className='trash-icon'></FcFullTrash></div>
      </div>

  )
}

export default TrackFavorites
