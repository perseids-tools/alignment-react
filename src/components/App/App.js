import Alignment from '../Alignment';
import Segment from '../Alignment/Segment';

const xml = `
<aligned-text xmlns="http://alpheios.net/namespaces/aligned-text">
  <language lnum="L1" xml:lang="eng" dir="ltr"/>
  <language lnum="L2" xml:lang="fre" dir="ltr"/>
  <comment class="title">alignment</comment>
  <sentence id="1" document_id="">
    <wds lnum="L1">
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
    <wds lnum="L2">
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
  <Alignment alignment={xml} id="1">
    <Segment language="eng" />
    <Segment language="fre" />
  </Alignment>
);

export default App;
