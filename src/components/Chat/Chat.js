import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import {
  Button,
  Container,
  Paper,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([{ author: 'user', text: '123' }]);
  const [isRobotTyping, setIsRobotTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({
    author: 'user',
    text: '',
  });

  const sendMessage = () => {
    if (currentMessage.text) {
      setMessages([...messages, currentMessage]);
      clearMessage();
    }
  };

  const onChange = (event) =>
    setCurrentMessage({ ...currentMessage, text: event.target.value });

  const clearMessage = (event) =>
    setCurrentMessage({ ...currentMessage, text: '' });

  useEffect(() => {
    if (messages[messages.length - 1].author !== 'robot') {
      setIsRobotTyping(true);
      setTimeout(() => {
        setMessages([
          ...messages,
          { author: 'robot', text: 'Я робот! Отвечаю на все сообщения!' },
        ]);
        setIsRobotTyping(false);
      }, 1500);
    }
  }, [messages]);

  return (
    <div>
      <StyledMessagesWrapper>
        <StyledTitle variant="h3" align={'center'}>
          Главная
        </StyledTitle>

        {messages.map((message, index) => (
          <StyledMessageWrapper
            variant="outlined"
            key={index}
            isRobotMessage={message.author === 'robot'}
            component={'div'}
          >
            <StyledMessageTitle variant="h5">
              {message.author}
            </StyledMessageTitle>
            <Typography variant="p">{message.text}</Typography>
          </StyledMessageWrapper>
        ))}
        {isRobotTyping && (
          <TypingMessage>Робот набирает сообщение ...</TypingMessage>
        )}
      </StyledMessagesWrapper>
      <StyledFooter>
        <StyledContainer>
          <StyledInput
            minRows={2}
            maxRows={5}
            aria-label="empty textarea"
            placeholder="Введите сообщение"
            onChange={onChange}
            value={currentMessage.text}
          />

          <Stack spacing={2} direction="row">
            <Button onClick={sendMessage} variant="contained">
              Отправить
            </Button>
            <Button onClick={clearMessage} variant="outlined">
              Очистить
            </Button>
          </Stack>
        </StyledContainer>
      </StyledFooter>
    </div>
  );
};

Chat.propTypes = {};

const StyledMessageWrapper = styled(Paper)`
  padding: 10px;
  align-self: ${({ isRobotMessage }) =>
    isRobotMessage ? 'self-start' : 'self-end'};
  min-width: 200px;
  border-radius: 10px;
  max-width: 500px;
`;

const StyledMessageTitle = styled(Typography)`
  margin-bottom: 10px;
`;

const StyledTitle = styled(Typography)`
  margin: 20px 0px;
`;

const StyledMessagesWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100vh - 200px);
  margin-left: 0px;
  padding: 10px;
`;

const StyledFooter = styled.div`
  margin-top: 20px;
  background: #fff;
  z-index: 1;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  left: 0px;
`;

const StyledInput = styled(TextareaAutosize)`
  width: 100%;
  padding: 10px;
`;

const TypingMessage = styled(Typography)`
  margin-top: 20px;
  opacity: 0.6;
`;

const StyledContainer = styled(Container)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

export { Chat };
