import React from 'react';
import styles from './Segment.module.scss';

const wordMap = (words, lnum, active, setActive) => {
  const map = [];

  words.w.forEach((word) => {
    const { text, $: { n }} = word;
    const classes = [styles.word]

    if (active[lnum] && active[lnum].has(n)) {
      classes.push(styles.active);
    }

    map.push(
      <span
        key={n}
        className={classes.join(' ')}
        onClick={() => setActive([lnum, n])}
      >
        {text[0]}
      </span>
    );
    map.push(' ');
  });

  map.pop();

  return map;
};

const Segment = ({ lnum, sentence, active, setActive }) => {
  const words = (sentence && sentence.wds) ? sentence.wds.find(({ $ }) => $.lnum === lnum) : false;

  if (!words) {
    return false;
  }

  return (
    <div className={styles.text}>
      {wordMap(words, lnum, active, setActive)}
    </div>
  );
};

export default Segment;
