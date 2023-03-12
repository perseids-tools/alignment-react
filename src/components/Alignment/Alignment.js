import React from 'react';
import { node, string } from 'prop-types';

import { xmlToJson } from '../../utils/parsing';

import AlignmentContext from './alignment-context';

const Alignment = ({ alignment, children }) => {
  const json = xmlToJson(alignment);

  return (
    <AlignmentContext.Provider value={{ json }}>
      {children}
    </AlignmentContext.Provider>
  );
};

Alignment.propTypes = {
  alignment: string.isRequired,
  children: node,
};

Alignment.defaultProps = {
  children: null,
};

export default Alignment;
