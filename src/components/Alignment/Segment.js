import React from 'react';
import { string } from 'prop-types';

import SentenceContext from './sentence-context';

import Segment from '../Segment';

const SegmentWithContext = ({ lnum }) => (
  <SentenceContext.Consumer>
    {({ sentence, active, setActive }) => (
      <Segment
        lnum={lnum}
        sentence={sentence}
        active={active}
        setActive={setActive}
      />
    )}
  </SentenceContext.Consumer>
);

SegmentWithContext.propTypes = {
  lnum: string.isRequired,
};

export default SegmentWithContext;
