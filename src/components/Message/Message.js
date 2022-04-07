import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@mui/material';

const Message = ({ message }) => {
  return (
    <MessageWrapper>
      <CardContent>
        <Typography variant="h5" component="div">
          {message.author}
        </Typography>
        <StyledTypography variant="body2">{message.text}</StyledTypography>
      </CardContent>
    </MessageWrapper>
  );
};

const MessageWrapper = styled(Card)`
  width: 100%;
  max-width: 360px;
`;

const StyledTypography = styled(Typography)`
  margin-top: 10px;
  font-size: 13px;
`;

Message.propTypes = {
  message: PropTypes.exact({
    author: PropTypes.string,
    text: PropTypes.string,
  }),
};

export { Message };
