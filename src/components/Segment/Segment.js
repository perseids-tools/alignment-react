const buildLanguageMap = (languages) => {
  const languageMap = {};

  languages.forEach((language) => {
    const lang = language.$['xml:lang'];
    const lnum = language.$.lnum;

    languageMap[lang] = lnum;
  });

  return languageMap;
};

const wordMap = (words) => {
  const map = [];

  words.w.forEach((word) => {
    const { text, $: { n }} = word;

    map.push(<span key={n}>{text[0]}</span>);
    map.push(' ');
  });

  map.pop();

  return map;
};

const Segment = ({ language, json, id, active, setActive }) => {
  const alignedText = json['aligned-text'];

  const languageMap = buildLanguageMap(alignedText.language);
  const sentence = alignedText.sentence.find(({ $: { id: sentenceId }}) => sentenceId == id);
  const words = sentence ? sentence.wds.find(({ $: { lnum }}) => lnum == languageMap[language]) : false;

  if (!words) {
    return false;
  }

  return (
    <div>
      {wordMap(words)}
    </div>
  );
};

export default Segment;
