import React from 'react';
import { func, string } from 'prop-types';

import { activeType, sentenceType } from '../../types';

import styles from './Segment.module.scss';

const wordSpans = (words, lnum, active, setActive) => {
  const spans = [];

  words.w.forEach((word) => {
    const { text, $: { n } } = word;
    const classes = [styles.word];

    if (active && active[lnum] && active[lnum].has(n)) {
      classes.push(styles.active);
    }
    const onClick = () => {
      setActive([lnum, n]);
    };
    const onKeyDown = (event) => {
      const { key } = event;

      if (key === 'Enter') {
        onClick();
      }
    };

    spans.push(
      <span
        key={n}
        role="button"
        tabIndex="0"
        className={classes.join(' ')}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {(text || []).join('')}
      </span>,
    );
    spans.push(' ');
  });

  spans.pop();

  return spans;
};

const Segment = ({
  lnum, sentence, active, setActive,
}) => {
  const words = (sentence && sentence.wds) ? sentence.wds.find(({ $ }) => $.lnum === lnum) : false;

  if (!words) {
    return false;
  }

  return (
    <div className={styles.text}>
      {wordSpans(words, lnum, active, setActive)}
    </div>
  );
};

Segment.propTypes = {
  lnum: string.isRequired,
  sentence: sentenceType.isRequired,
  active: activeType,
  setActive: func.isRequired,
};

Segment.defaultProps = {
  active: null,
};

export default Segment;
