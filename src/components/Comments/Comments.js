import React from 'react';

import { activeType, sentenceType } from '../../types';

import styles from './Comments.module.scss';

// eslint-disable-next-line react/prop-types
const commentDl = ({ title, value }, lnum, n, ii) => (
  <dl key={`comment-${lnum}-${n}-${ii}`} className={styles.dl}>
    <div className={styles.container}>
      <dt className={styles.dt}>{title}</dt>
      <dd className={styles.dd}>{value}</dd>
    </div>
  </dl>
);

const wordListDls = ({ wds, active }) => {
  const dls = [];

  (wds || []).forEach(({ $: { lnum }, w }) => (
    (w || []).forEach(({ $: { n }, comment, text }) => (
      (comment || []).forEach(({ _: commentText }, ii) => {
        const title = (text || []).map(({ _ }) => _).join(' ');

        if (active && active.aligned && active.aligned[lnum] && active.aligned[lnum].has(n)) {
          dls.push(commentDl({ title, value: commentText }, lnum, n, ii));
        }
      })
    ))
  ));

  return dls;
};

const Comments = ({ sentence, active }) => {
  if (!active) {
    return false;
  }

  const wds = sentence && sentence.wds;
  const dls = wordListDls({ wds, active });

  if (dls.length === 0) {
    return false;
  }

  return (
    <div className={styles.comments}>{dls}</div>
  );
};

Comments.propTypes = {
  sentence: sentenceType.isRequired,
  active: activeType,
};

Comments.defaultProps = {
  active: null,
};

export default Comments;
