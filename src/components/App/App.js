import { useState } from 'react';

import Text from '../Text';

import './App.css';

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

const App = () => {
  const [activeWords, setActiveWords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverWords, setHoverWords] = useState([]);
  const [alignment, setAlignment] = useState([]);

  const onClick = () => {
    const newAlignment = [...alignment];

    newAlignment.push(activeWords);
    setActiveWords([]);
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Text text={greek} index={0} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <Text text={english} index={1} activeWords={activeWords} setActiveWords={setActiveWords} hoverWords={hoverWords} setHoverWords={setHoverWords} alignment={alignment} />
      <button onClick={onClick}>align</button>
    </div>
  );
};

export default App;
