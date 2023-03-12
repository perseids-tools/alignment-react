import React from 'react';
import { string } from 'prop-types';

import SentenceContext from './sentence-context';

import Segment from '../Segment';

const SegmentWithContext = ({ lnum }) => (
  <SentenceContext.Consumer>
    {({ sentence, active, toggleActive }) => (
      <Segment
        lnum={lnum}
        sentence={sentence}
        active={active}
        toggleActive={toggleActive}
      />
    )}
  </SentenceContext.Consumer>
);

SegmentWithContext.propTypes = {
  lnum: string.isRequired,
};

export default SegmentWithContext;
