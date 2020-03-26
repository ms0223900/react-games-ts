import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { StarItemContainerProps } from '../types';

const StarItemContainer = ({
  onChange,
  isStared,
}: StarItemContainerProps) => {
  const [isStar, setStar] = useState(!!isStared);

  const _isStared = typeof isStared !== 'undefined' ? isStared : isStar;

  const handleToggle = useCallback(() => {
    setStar(s => !s);
  }, []);

  useEffect(() => {
    onChange && onChange(isStar);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStar]);

  return (
    <Box
      style={{
        cursor: 'pointer',
      }}
      onClick={handleToggle}
    >
      {_isStared ? (
        <Star />
      ) : (
        <StarBorder />
      )}
    </Box>
  );
};

export default StarItemContainer;