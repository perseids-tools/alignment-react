import { useState } from 'react';

import Text from '../Text';

import styles from './App.module.css';

const greek = [
  'Δαρείου',
  'καὶ',
  'Παρυσάτιδος',
  'γίγνονται',
  'παῖδες',
  'δύο',
];

const english = [
  'Darius',
  'and',
  'Parysatis',
  'had',
  'two',
  'sons',
  'born',
  'to',
  'them',
];

const french = [
  'De',
  "l'hymen",
  'de',
  'Darius',
  'et',
  'de',
  'Parysatis',
  'naquirent',
  'deux',
  'princes',
]

const App = () => {
  const [activeWords, setActiveWords] = useState([]);
  const [hoverWords, setHoverWords] = useState([]);
  const [alignment, setAlignment] = useState([]);

  const onClick = () => {
    const newAlignment = [...alignment];

    newAlignment.push(activeWords);
    setActiveWords([]);
    setAlignment(newAlignment);
  };

  return (
    <div className={styles.container}>
      <Text text={greek} index={0} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={english} index={1} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={french} index={2} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={english} index={3} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={english} index={4} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={english} index={5} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={english} index={6} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <button onClick={onClick}>align</button>
    </div>
  );
};

export default App;
