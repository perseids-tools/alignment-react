import React, { useState, useEffect } from 'react';

import AlignmentContext from '../alignment-context';
import SentenceContext from '../sentence-context';

const buildIdMap = (json, id) => {
  const idMap = {};

  return idMap;
};

const WrappedSentence = ({ id, json, children }) => {
  const [active, setActive] = useState(null);
  const [idMap, setIdMap] = useState(null);

  // useEffect(() => {
  //   setIdMap(buildIdMap(json, id));
  // }, [id, json]);

  const alignedText = json['aligned-text'];
  const sentence = alignedText.sentence.find(({ $: { id: sentenceId }}) => sentenceId === id);

  return (
    <SentenceContext.Provider value={{
      sentence,
      active,
      setActive,
    }}
    >
      {children}
    </SentenceContext.Provider>
  );
};

const Sentence = ({ id, children }) => (
  <AlignmentContext.Consumer>
    {({ json }) => (
      <WrappedSentence id={id} json={json}>
        {children}
      </WrappedSentence>
    )}
  </AlignmentContext.Consumer>
);

export default Sentence;
