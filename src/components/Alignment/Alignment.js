import { useState } from 'react';

import { xmlToJson } from '../../utils/parsing';

import AlignmentContext from './alignment-context';

const Alignment = ({ alignment, id, children }) => {
  const json = xmlToJson(alignment);
  const { active, setActive } = useState(null);

  return (
    <AlignmentContext.Provider value={{ json, id, active, setActive }}>
      {children}
    </AlignmentContext.Provider>
  );
};

export default Alignment;
