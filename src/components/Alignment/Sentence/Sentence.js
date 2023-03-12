import React, { useState, useEffect } from 'react';
import { node, string } from 'prop-types';

import { alignmentType } from '../../../types';

import AlignmentContext from '../alignment-context';
import SentenceContext from '../sentence-context';

const uniq = (array) => Array.from(new Set(array));

// The XML structure used by Perseids for alignments includes some gotchas:
//   * Word IDs are not globally unique
//   * It is possible for A to be aligned with B without B being aligned with A
//   * References do not have a field for lnum, meaning that alignments with more
//     than one language are impossible
// Future versions of Perseids should improve on the format, but this application needs
// to be backwards compatible. This function converts the XML into an object that looks
// like this (assuming languages have lnums of L1 and L2):
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
const buildIdMap = (alignedText, sentence) => {
  const idMap = {};

  const lnums = uniq(alignedText.language.map(({ $: { lnum } }) => lnum));
  lnums.forEach((ln) => { idMap[ln] = {}; });

  const addToSet = (outerLnum, outerN, innerLnum, innerN) => {
    if (!idMap[outerLnum][outerN]) {
      idMap[outerLnum][outerN] = {};

      lnums.forEach((ln) => { idMap[outerLnum][outerN][ln] = new Set(); });
    }

    idMap[outerLnum][outerN][innerLnum].add(innerN);
  };

  // This is the hairiest part of the algorithm. But I'm not sure if there's a better way
  // to do things. When a word in L1 aligns with a word in L2, we add all members from
  // the L1 set to the L2 set. (At this time, JavaScript has no Set unify operation.)
  // We then actually set the pointer for L1 and L2 to the *same Set*. This means
  // that any future additions affect both L1 and L2. The reason we do this is to account
  // for "sibling" words: two words with the same lnum that align to the same word in
  // the other lnum.
  const unifySets = (lnum1, n1, lnum2, n2) => {
    idMap[lnum1][n1][lnum1].forEach((v) => idMap[lnum2][n2][lnum1].add(v));
    idMap[lnum1][n1][lnum2].forEach((v) => idMap[lnum2][n2][lnum2].add(v));

    idMap[lnum2][n2][lnum1] = idMap[lnum1][n1][lnum1];
    idMap[lnum2][n2][lnum2] = idMap[lnum1][n1][lnum2];
  };

  sentence.wds.forEach((wd) => {
    const { lnum } = wd.$;

    wd.w.forEach((word) => {
      const { n } = word.$;
      // Align every word with itself
      addToSet(lnum, n, lnum, n);

      if (word.refs) {
        const nrefs = word.refs[0].$.nrefs.split(/\s+/);

        lnums.forEach((lnumRef) => {
          if (lnumRef !== lnum) {
            nrefs.forEach((nref) => {
              addToSet(lnum, n, lnumRef, nref);
              addToSet(lnumRef, nref, lnum, n);
              unifySets(lnum, n, lnumRef, nref);
            });
          }
        });
      }
    });
  });

  return idMap;
};

// eslint-disable-next-line react/prop-types
const WrappedSentence = ({ id, json, children }) => {
  const [active, setActive] = useState(null);
  const [idMap, setIdMap] = useState({});
  const [sentence, setSentence] = useState({});

  useEffect(() => {
    const alignedText = json['aligned-text'];
    const newSentence = (alignedText.sentence || [])
      .find(({ $: { id: sentenceId } }) => sentenceId === id);

    setSentence(newSentence);
    setIdMap(buildIdMap(alignedText, newSentence));
  }, [id, json]);

  const setActiveFromChild = ([lnum, wordId]) => {
    if (idMap[lnum] && idMap[lnum][wordId]) {
      setActive(idMap[lnum][wordId]);
    }
  };

  return (
    <SentenceContext.Provider value={{
      sentence,
      active,
      setActive: setActiveFromChild,
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

WrappedSentence.propTypes = {
  id: string.isRequired,
  json: alignmentType.isRequired,
  children: node,
};

WrappedSentence.defaultProps = {
  children: null,
};

Sentence.propTypes = {
  id: string.isRequired,
  children: node,
};

Sentence.defaultProps = {
  children: null,
};

export default Sentence;
