import styles from './Text.module.css';

const Text = ({ text, index, activeWords, setActiveWords, alignment, hoverWords, setHoverWords }) => {
  const onClickFun = (key) => {
    return () => {
      const newActiveWords = [...activeWords];

      if (!newActiveWords[index]) {
        newActiveWords[index] = [];
      }

      newActiveWords[index].push(key);
      setActiveWords(newActiveWords);
    };
  };

  const onMouseOverFun = (key) => {
    return () => {
      const newHoverWords = alignment.find(words => words[index].includes(key));

      if (newHoverWords) {
        setHoverWords(newHoverWords);
      }
    };
  };

  const words = text.map((t, ii) => {
    const classes = [styles.word];

    if (activeWords[index] && activeWords[index].includes(ii)) {
      classes.push(styles.active);
    }

    if (hoverWords[index] && hoverWords[index].includes(ii)) {
      classes.push(styles.hover);
    }

    return (
      <span className={classes.join(' ')} key={ii} onClick={onClickFun(ii)} onMouseOver={onMouseOverFun(ii)}>
        {t}
      </span>
    );
  });

  return (
    <div>
      {words}
    </div>
  );
};

export default Text;
