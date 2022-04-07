import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import styled from '@emotion/styled';

const Header = () => {
  return (
    <StyledWrapper
      sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
    >
      {Object.values(ROUTES).map(({ path, linkText }, index) => (
        <Link key={index} to={path}>
          <Typography sx={{ minWidth: 100 }}>{linkText}</Typography>
        </Link>
      ))}
    </StyledWrapper>
  );
};

Header.propTypes = {};

const StyledWrapper = styled(Box)`
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0px;
  border-radius: 5px;
`;

export { Header };
