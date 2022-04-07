import React from 'react';
import PropTypes from 'prop-types';
import { Chat } from '../components/Chat';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Chats = () => {
  return (
    <div>
      <StyledTypography variant="h3" align={'center'}>
        Список чатов
      </StyledTypography>
      <Paper variant="outlined" component={'div'}>
        <StyledLinkWrapper to={'/chats/1'}>
          <Typography>Чат 1</Typography>
        </StyledLinkWrapper>
      </Paper>
    </div>
  );
};

Chats.propTypes = {};

const StyledTypography = styled(Typography)`
  margin: 20px 0px;
`;

const StyledLinkWrapper = styled(Link)`
  color: #000;
  text-decoration: none;
  &:hover {
    background-color: #eee;
  }
`;
export { Chats };
