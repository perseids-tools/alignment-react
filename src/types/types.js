import {
  arrayOf,
  instanceOf,
  objectOf,
  shape,
  string,
} from 'prop-types';

const commentType = shape({
  $: shape({
    class: string.isRequired,
  }).isRequired,
  _: string,
});

const refsType = shape({
  $: shape({
    nrefs: string.isRequired,
  }).isRequired,
});

const wordType = shape({
  $: shape({
    n: string.isRequired,
  }).isRequired,
  comment: arrayOf(commentType),
  text: arrayOf(shape({
    _: string.isRequired,
  })),
  refs: arrayOf(refsType),
});

const wordListType = shape({
  $: shape({
    lnum: string.isRequired,
  }).isRequired,
  comment: arrayOf(commentType),
  w: arrayOf(wordType),
});

const sentenceType = shape({
  $: shape({
    n: string.isRequired,
  }).isRequired,
  wds: arrayOf(wordListType),
});

const alignmentType = shape({
  'aligned-text': shape({
    sentence: arrayOf(sentenceType).isRequired,
  }).isRequired,
});

const activeType = shape({
  selected: shape({
    lnum: string.isRequired,
    n: string.isRequired,
  }).isRequired,
  aligned: objectOf(instanceOf(Set)).isRequired,
});

export {
  commentType,
  refsType,
  wordType,
  wordListType,
  sentenceType,
  alignmentType,
  activeType,
};
