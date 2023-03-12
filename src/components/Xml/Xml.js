import React, { Fragment } from 'react';
import { func } from 'prop-types';

import { activeType, sentenceType } from '../../types';

import styles from './Xml.module.scss';

// The space in the quotes below is the non-breaking space (&nbsp;)
const tab = (indent) => <>{' '.repeat(indent * 4)}</>;

const attributesToJsx = (attributes) => (
  Object.entries(attributes || {}).map(([key, value]) => (
    <Fragment key={key}>
      {' '}
      <span className={styles.attribute}>
        {key}
        =
      </span>
      <span className={styles.attributeText}>
        &quot;
        {value}
        &quot;
      </span>
    </Fragment>
  ))
);

const openingTag = (name, attributes, key, indent = 0, close = false, br = true) => (
  <Fragment key={key}>
    <span className={styles.bracket}>
      {tab(indent)}
      &lt;
    </span>
    <span className={styles.element}>{name}</span>
    {attributesToJsx(attributes)}
    {close ? ' /' : ''}
    <span className={styles.bracket}>&gt;</span>
    {br && <br />}
  </Fragment>
);

const closingTag = (name, key, indent = 0) => (
  <Fragment key={key}>
    <span className={styles.bracket}>
      {tab(indent)}
      &lt;
    </span>
    <span className={styles.element}>
      /
      {name}
    </span>
    <span className={styles.bracket}>&gt;</span>
  </Fragment>
);

const renderComment = (comment, key, indent) => {
  const { _, $ } = comment;

  if (_) {
    return (
      <div key={key}>
        {openingTag('comment', $, `open-${key}`, indent, false, false)}
        {_}
        {closingTag('comment', `close-${key}`)}
      </div>
    );
  }

  return (
    <div key={key}>
      {openingTag('comment', comment.$, key, indent, true)}
    </div>
  );
};

const renderText = (text, key, indent) => {
  const { _, $ } = text;

  return (
    <div key={key}>
      {openingTag('text', $, `open-${key}`, indent, false, false)}
      {_}
      {closingTag('text', `close-${key}`)}
    </div>
  );
};

const renderWord = (word, key, lnum, active, toggleActive, indent) => {
  const {
    text, refs, comment, $: { n },
  } = word;

  const classes = [styles.word];
  const onClick = () => {
    toggleActive([lnum, n]);
  };
  const onKeyDown = (event) => {
    const { key: eventKey } = event;

    if (eventKey === 'Enter') {
      onClick(event);
    }
  };

  if (active && active[lnum] && active[lnum].has(n)) {
    classes.push(styles.active);
  }

  return (
    <div
      key={`${lnum}-${n}`}
      role="button"
      tabIndex="0"
      className={classes.join(' ')}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {openingTag('w', word.$, `open-${key}`, indent)}
      {comment && comment.map((cmt, ii) => renderComment(cmt, `comment-${key}-${ii}`, indent + 1))}
      {text && text.map((txt, ii) => renderText(txt, `text-${key}-${ii}`, indent + 1))}
      {refs && refs.map((rfs, ii) => openingTag('refs', rfs.$, `ref-${key}-${ii}`, indent + 1))}
      {closingTag('w', `close-${key}`, indent)}
    </div>
  );
};

const renderWordList = (wordList, active, toggleActive) => {
  const { w, comment, $ } = wordList;
  const { lnum } = $;

  return (
    <Fragment key={lnum}>
      {openingTag('wds', $, `open-${lnum}`, 2, true)}
      {comment && comment.map((cmt, ii) => renderComment(cmt, `${lnum}-${ii}`, 3))}
      {w && w.map((word, ii) => renderWord(word, `${lnum}-${ii}`, lnum, active, toggleActive, 3))}
      {closingTag('wds', `close-${lnum}`, 2)}
      <br />
    </Fragment>
  );
};

const Xml = ({
  sentence, active, toggleActive,
}) => (
  <div className={styles.xml}>
    {openingTag('sentence', sentence.$, 'sentence')}
    {sentence.wds && sentence.wds.map((wordList) => (
      renderWordList(wordList, active, toggleActive)
    ))}
    {closingTag('sentence', 'sentence-close')}
  </div>
);

Xml.propTypes = {
  active: activeType,
  sentence: sentenceType.isRequired,
  toggleActive: func.isRequired,
};

Xml.defaultProps = {
  active: null,
};

export default Xml;
