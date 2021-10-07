import React, { useState, useEffect } from 'react';

import AlignmentContext from '../alignment-context';
import SentenceContext from '../sentence-context';

const uniq = (array) => Array.from(new Set(array));

// The XML structure used by Perseids for alignments includes some gotchas:
//   * Word IDs are not globally unique
//   * It is possible for A to be aligned with B without B being aligned with A
//   * References do not have a field for `lnum`, meaning that alignments with more
//     than one language are impossible
// Future versions of Perseids should improve on the format, but this application needs
// to be backwards compatible. This function converts the XML into an object that looks
// like this (assuming languages have `lnum`s of `L1` and `L2`:
// {
//   L1: {
//     '1-1': {
//       L1: Set(['1-1', '1-2']),
//       L2: Set(['1-3']),
//     },
//     '1-2': {
//       L1: Set(['1-1', '1-2']),
//       L2: Set(['1-3']),
//     },
//   },
//   L2: {
//     '1-3': {
//       L1: Set(['1-1', '1-2']),
//       L2: Set(['1-3']),
//     },
//   }
// }
// What this means is that words 1-1 and 1-2 in L1 are aligned with word 1-3 in L2.
const buildIdMap = (alignedText, sentence, id) => {
  const idMap = {};

  const lnums = uniq(alignedText.language.map(({ $: { lnum } }) => lnum));
  lnums.forEach((ln) => idMap[ln] = {});

  const addToSet = (outerLnum, outerN, innerLnum, innerN) => {
    if (!idMap[outerLnum][outerN]) {
      idMap[outerLnum][outerN] = {};

      lnums.forEach((ln) => idMap[outerLnum][outerN][ln] = new Set());
    }

    idMap[outerLnum][outerN][innerLnum].add(innerN);
  };

  sentence.wds.forEach(wd => {
    const lnum = wd.$.lnum;

    wd.w.forEach(word => {
      const n = word.$.n;

      if (word.refs) {
        const nrefs = word.refs[0].$.nrefs.split(/\s+/);

        lnums.forEach(lnumRef => {
          if (lnumRef !== lnum) {
            addToSet(lnum, n, lnum, n);

            nrefs.forEach(nref => {
              addToSet(lnum, n, lnumRef, nref);
              addToSet(lnumRef, nref, lnum, n);
              addToSet(lnumRef, nref, lnumRef, nref);
            });
          }
        });
      }
    });
  });

  return idMap;
};

const WrappedSentence = ({ id, json, children }) => {
  const [active, setActive] = useState(null);
  const [idMap, setIdMap] = useState({});

  const alignedText = json['aligned-text'];
  const sentence = alignedText.sentence.find(({ $: { id: sentenceId }}) => sentenceId === id);

  useEffect(() => {
    setIdMap(buildIdMap(alignedText, sentence));
  }, [id, json]);

  return (
    <SentenceContext.Provider value={{
      sentence,
      active,
      setActive,
      idMap,
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
