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

export default SegmentWithContext;
