import React from 'react';

import SentenceContext from '../sentence-context';

import Comments from '../../Comments';

const CommentsWithContext = () => (
  <SentenceContext.Consumer>
    {({ sentence, active }) => (
      <Comments
        sentence={sentence}
        active={active}
      />
    )}
  </SentenceContext.Consumer>
);

export default CommentsWithContext;
