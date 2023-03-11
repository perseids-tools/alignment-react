import React from 'react';

import { Alignment, Sentence, Segment } from 'alignment-react';
import 'alignment-react/dist/index.css';

const xml = `
<aligned-text xmlns="http://alpheios.net/namespaces/aligned-text">
  <language lnum="en" xml:lang="en" dir="ltr"/>
  <language lnum="fr" xml:lang="fr" dir="ltr"/>
  <comment class="title">alignment</comment>
  <sentence id="1" document_id="">
    <wds lnum="en">
      <comment class="uri"/>
      <w n="1-1">
        <text>hello</text>
        <refs nrefs="1-1"/>
      </w>
      <w n="1-2">
        <text>world</text>
        <refs nrefs="1-2 1-3"/>
      </w>
    </wds>
    <wds lnum="fr">
      <comment class="uri"/>
      <w n="1-1">
        <text>bonjour</text>
        <refs nrefs="1-1"/>
      </w>
      <w n="1-2">
        <text>le</text>
        <refs nrefs="1-2"/>
      </w>
      <w n="1-3">
        <text>monde</text>
        <refs nrefs="1-2"/>
      </w>
    </wds>
  </sentence>
</aligned-text>
`;

const App = () => (
  <Alignment alignment={xml}>
    <Sentence id="1">
      <Segment lnum="en" />
      <Segment lnum="fr" />
    </Sentence>
  </Alignment>
);

export default App;
