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

export default Alignment;
