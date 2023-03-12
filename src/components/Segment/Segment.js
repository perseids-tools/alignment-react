import React from 'react';
import { func, string } from 'prop-types';

import { activeType, sentenceType } from '../../types';

import styles from './Segment.module.scss';

const wordSpans = (words, lnum, active, toggleActive) => {
  const spans = [];

  words.w.forEach((word) => {
    const { text, $: { n } } = word;
    const classes = [styles.word];
    const innerText = text.map(({ _ }) => _).join(<br />);

    if (active && active[lnum] && active[lnum].has(n)) {
      classes.push(styles.active);
    }
    const onClick = () => {
      toggleActive([lnum, n]);
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
        {innerText}
      </span>,
    );
    spans.push(' ');
  });

  spans.pop();

  return spans;
};

const Segment = ({
  lnum, sentence, active, toggleActive,
}) => {
  const words = (sentence && sentence.wds) ? sentence.wds.find(({ $ }) => $.lnum === lnum) : false;

  if (!words) {
    return false;
  }

  return (
    <div className={styles.text}>
      {wordSpans(words, lnum, active, toggleActive)}
    </div>
  );
};

Segment.propTypes = {
  lnum: string.isRequired,
  sentence: sentenceType.isRequired,
  active: activeType,
  toggleActive: func.isRequired,
};

Segment.defaultProps = {
  active: null,
};

export default Segment;
