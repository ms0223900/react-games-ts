import React, { useState, useEffect } from 'react'
import { Box, Paper, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { emoteData_mockData } from '../config'
import { updateChat, getEmotes } from '../API';

const useStyles = makeStyles({
  emotePopup: {
    display: props => props.emoteDisplay ? 'block': 'none',
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    height: 200,
  },
  emoteItem: {
    width: 70,
    height: 70,
    display: 'inline-block',
    padding: 4,
    cursor: 'pointer',
    '& img': {
      width: '100%',
      height: 'auto',
    },
    '&:hover': {
      backgroundColor: '#ddd',
    }
  },
  emoteArea: {
    overflowY: 'scroll',
  },
  emotePopupHead: {
    backgroundColor: '#ccc',
    height: 20,
    textAlign: 'right',
    '& button': {
      // padding: 4,
      width: 20,
      height: 20,
      borderRadius: 2000,
    }
  }
})

const SingleEmoteItem = ({ imgSrc, emoteChatFn }) => {
  const classes = useStyles()
  return (
    <Box 
      className={ classes.emoteItem }
      onClick={ emoteChatFn }
    >
      <img src={ imgSrc } />
    </Box>
  )
}

const EmotePopup = ({ username, roomId, emoteDisplay, setLatestEmoteChat, emoteDataInit=[], closeFn }) => {
  const classes = useStyles({ emoteDisplay })
  const [emotesData, setEmotesData] = useState(emoteDataInit)
  const handleEmoteChat = (imgSrc, username, roomId) => {
    setLatestEmoteChat(imgSrc, 'emote')
    roomId && updateChat(roomId, username, imgSrc, 'emote')
  }
  useEffect(() => {
    emotesData.length === 0 && 
    getEmotes()
      .then(res => setEmotesData(res))
  }, [])
  return (
    <Paper className={ classes.emotePopup }>
      <Box className={ classes.emotePopupHead }>
        <button onClick={ closeFn }>{'x'}</button>
      </Box>
      <Box className={ classes.emoteArea }>
        {emotesData.length > 0 ? (
          <>
            {emotesData.map(data => (
              <SingleEmoteItem 
                key={ data.id }
                emoteChatFn={ () => handleEmoteChat(data.imgSrc, username, roomId) }
                {...data}  />
            ))}
          </>
        ) : (
          <CircularProgress />
        )}
        
      </Box>
    </Paper>
  )
}

export default EmotePopup
