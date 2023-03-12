import {
  arrayOf,
  instanceOf,
  objectOf,
  shape,
  string,
} from 'prop-types';

const wordType = shape({
  $: shape({
    n: string.isRequired,
  }),
  text: arrayOf(string),
});

const wordListType = shape({
  $: shape({
    lnum: string.isRequired,
  }),
  w: arrayOf(wordType),
});

const sentenceType = shape({
  $: shape({
    n: string.isRequired,
  }),
  wds: arrayOf(wordListType),
});

const alignmentType = shape({
  'aligned-text': shape({
    sentence: arrayOf(sentenceType),
  }),
});

const activeType = objectOf(instanceOf(Set));

export {
  wordType,
  wordListType,
  sentenceType,
  alignmentType,
  activeType,
};
