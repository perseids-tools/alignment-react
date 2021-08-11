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

// const getActiveN = (active, lnum) => {
//   if (active) {
//     const activeN = active.from === lnum ? active.n : active.nrefs;
//
//     return activeN.split(/\s+/);
//   }
//
//   return [];
// };
//
// const canonicalOrder = (stringOrArray) => {
//   const array = typeof stringOrArray === 'string' ? stringOrArray.split(/\s+/) : stringOrArray;
//
//   return array.sort().join(' ');
// };
//
// const generateGroups = (words) => {
//   const groups = {};
//
//   words.w.forEach(({ refs, $: { n }}) => {
//     if (refs) {
//       refs.forEach(({ $: { nrefs }}) => {
//         const canonicalNref = canonicalOrder(nrefs);
//
//         groups[canonicalNref] = groups[canonicalNref] || [];
//         groups[canonicalNref].push(n);
//       });
//     }
//   });
//
//   return groups;
// };

const Segment = ({ lnum, sentence }) => {
  // const alignedText = json['aligned-text'];
  //
  // const sentence = alignedText.sentence.find(({ $: { id: sentenceId }}) => sentenceId === id);
  const words = sentence ? sentence.wds.find(({ $ }) => $.lnum === lnum) : false;

  // const activeN = getActiveN(active, lnum);

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
