import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MESSAGES } from '../constants/messages';
import { Message } from '../components/Message';
import { Typography } from '@mui/material';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(MESSAGES);
  }, []);

  return (
    <StyledWrapper>
      <StyledTypography variant="h3" align={'center'}>
        Главная
      </StyledTypography>
      <MessagesWrapper>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </MessagesWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

const StyledTypography = styled(Typography)`
  margin: 20px 0px;
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

Messages.propTypes = {};

export { Messages };
