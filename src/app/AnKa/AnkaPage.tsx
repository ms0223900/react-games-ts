import React, { useState, useCallback, ChangeEvent } from 'react';
import { Box, Container, Divider, makeStyles } from '@material-ui/core';
import Reply from './Reply';
import { ID, SingleMessage, SingleAnkaElement } from 'anka-types';
import AnkaTextArea from './AnkaTextArea';
import { user01_mockData } from 'app/AnKa/storage/mockData';

const getSingleAnkaEl = () => {
  const number = ~~(Math.random() * 4);
  const type = 'dice';
  return ({
    type,
    number
  });
};

const checkIsAnkaed = (hostAnkaEl: SingleAnkaElement, otherAnkaEl: SingleAnkaElement) => {
  
};


const useStyles = makeStyles({
  mesContainer: {
    backgroundColor: '#eee',
    padding: 16,
    maxHeight: 600,
    overflowY: 'scroll',
  }
});

type AnkaPageProps = {
  ankaHostId: ID
  queriedMessages?: SingleMessage[]
}
const AnkaPage = ({ ankaHostId, queriedMessages=[] }: AnkaPageProps) => {
  const classes = useStyles();
  const [messages, setMessages] = useState(queriedMessages);
  const [replyUseAnka, setUseAnka] = useState(false);
  const [textAreaValue, setValue] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handleSendReply = useCallback(() => {
    const randAnkaElement = getSingleAnkaEl();
    const newMessage: SingleMessage = {
      id: messages.length + 1,
      userId: user01_mockData.id,
      username: user01_mockData.username,
      content: textAreaValue,
      created_at: new Date(),
      ankaElement: replyUseAnka ? randAnkaElement : undefined,
    };
    setMessages(mes => [
      ...mes,
      newMessage,
    ]);
    setValue('');
  }, [messages.length, replyUseAnka, textAreaValue]);
  const handleSetUseAnka = () => {
    setUseAnka(a => !a);
  };

  // const isAnkaHost = ankaHostId === mes.userId;
  return (
    <Container>
      <Box className={classes.mesContainer}>
        {messages.map(mes => (
          <Reply 
            key={mes.id}
            {...mes} 
            isAnkaHost={ankaHostId === mes.userId} />
        ))}
      </Box>
      <Divider />
      <AnkaTextArea 
        isUseAnka={replyUseAnka}
        setUseAnkaFn={handleSetUseAnka}
        inputTextAreaFn={handleInput}
        textAreaValue={textAreaValue}
        sendFn={handleSendReply}
      />
    </Container>
  );
};

export default AnkaPage;