import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const MainPage = () => {
  return (
    <StyledTypography variant="h3" align={'center'}>
      Главная
    </StyledTypography>
  );
};

MainPage.propTypes = {};

const StyledTypography = styled(Typography)`
  margin: 20px 0px;
`;

export { MainPage };
