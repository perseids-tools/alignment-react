import React from 'react';

import {
  Alignment,
  Collapse,
  Sentence,
  Segment,
  Xml,
} from 'alignment-react';
import 'alignment-react/dist/index.css';

// Public domain text from:
//   Herodotus, with an English translation by A. D. Godley.
//   Harvard University Press. 1920.
// Alignment created for this demo
const xml = `
<aligned-text xmlns="http://alpheios.net/namespaces/aligned-text">
    <language lnum="L1" xml:lang="grc"/>
    <language lnum="L2" xml:lang="eng"/>
    <sentence n="1">
        <wds lnum="L1">
            <comment class="uri"/>
            <w n="1-1">
                <text>Ἡροδότου</text>
                <refs nrefs="1-8 1-9"/>
            </w>
            <w n="1-2">
                <text>Ἁλικαρνησσέος</text>
                <refs nrefs="1-10 1-11"/>
            </w>
            <w n="1-3">
                <text>ἱστορίης</text>
                <comment class="mark">Sometimes translated as "history"</comment>
                <refs nrefs="1-5 1-6 1-7"/>
            </w>
            <w n="1-4">
                <text>ἀπόδεξις</text>
                <refs nrefs="1-3 1-4"/>
            </w>
            <w n="1-5">
                <text>ἥδε</text>
                <refs nrefs="1-1 1-2"/>
            </w>
            <w n="1-6">
                <text>,</text>
                <refs nrefs="1-12"/>
            </w>
            <w n="1-7">
                <text>ὡς</text>
                <refs nrefs="1-13 1-14 1-26"/>
            </w>
            <w n="1-8">
                <text>μήτε</text>
                <refs nrefs="1-19"/>
            </w>
            <w n="1-9">
                <text>τὰ</text>
                <refs nrefs="1-15 1-16"/>
            </w>
            <w n="1-10">
                <text>γενόμενα</text>
                <refs nrefs="1-15 1-16"/>
            </w>
            <w n="1-11">
                <text>ἐξ</text>
                <refs nrefs="1-17"/>
            </w>
            <w n="1-12">
                <text>ἀνθρώπων</text>
                <refs nrefs="1-18"/>
            </w>
            <w n="1-13">
                <text>τῷ</text>
                <refs nrefs="1-22 1-23"/>
            </w>
            <w n="1-14">
                <text>χρόνῳ</text>
                <refs nrefs="1-22 1-23"/>
            </w>
            <w n="1-15">
                <text>ἐξίτηλα</text>
                <refs nrefs="1-21"/>
            </w>
            <w n="1-16">
                <text>γένηται</text>
                <refs nrefs="1-20"/>
            </w>
            <w n="1-17">
                <text>,</text>
                <refs nrefs="1-24"/>
            </w>
            <w n="1-18">
                <text>μήτε</text>
                <refs nrefs="1-25 1-43"/>
            </w>
            <w n="1-19">
                <text>ἔργα</text>
                <refs nrefs="1-30"/>
            </w>
            <w n="1-20">
                <text>μεγάλα</text>
                <refs nrefs="1-27"/>
            </w>
            <w n="1-21">
                <text>τε</text>
                <refs nrefs="1-28"/>
            </w>
            <w n="1-22">
                <text>καὶ</text>
                <refs nrefs="1-28"/>
            </w>
            <w n="1-23">
                <text>θωμαστά</text>
                <refs nrefs="1-29"/>
            </w>
            <w n="1-24">
                <text>,</text>
                <refs nrefs="1-31"/>
            </w>
            <w n="1-25">
                <text>τὰ</text>
                <refs nrefs="1-32"/>
            </w>
            <w n="1-26">
                <text>μὲν</text>
                <refs nrefs="1-32"/>
            </w>
            <w n="1-27">
                <text>Ἕλλησι</text>
                <refs nrefs="1-34 1-35 1-36"/>
            </w>
            <w n="1-28">
                <text>τὰ</text>
                <refs nrefs="1-37 1-38"/>
            </w>
            <w n="1-29">
                <text>δὲ</text>
                <refs nrefs="1-37 1-38"/>
            </w>
            <w n="1-30">
                <text>βαρβάροισι</text>
                <refs nrefs="1-39 1-40 1-41"/>
            </w>
            <w n="1-31">
                <text>ἀποδεχθέντα</text>
                <refs nrefs="1-33"/>
            </w>
            <w n="1-32">
                <text>,</text>
                <refs nrefs="1-42"/>
            </w>
            <w n="1-33">
                <text>ἀκλεᾶ</text>
                <refs nrefs="1-45 1-46"/>
            </w>
            <w n="1-34">
                <text>γένηται</text>
                <refs nrefs="1-44"/>
            </w>
            <w n="1-35">
                <text>,</text>
                <refs nrefs="1-47"/>
            </w>
            <w n="1-36">
                <text>τά</text>
                <refs nrefs="1-48 1-49 1-50"/>
            </w>
            <w n="1-37">
                <text>τε</text>
                <refs nrefs="1-48 1-49 1-50"/>
            </w>
            <w n="1-38">
                <text>ἄλλα</text>
                <refs nrefs="1-48 1-49 1-50"/>
            </w>
            <w n="1-39">
                <text>καὶ</text>
                <refs nrefs="1-48 1-49 1-50"/>
            </w>
            <w n="1-40">
                <text>δι᾽</text>
                <refs nrefs="1-51 1-52"/>
            </w>
            <w n="1-41">
                <text>ἣν</text>
                <refs nrefs="1-51 1-52"/>
            </w>
            <w n="1-42">
                <text>αἰτίην</text>
                <refs nrefs="1-53 1-54 1-55"/>
            </w>
            <w n="1-43">
                <text>ἐπολέμησαν</text>
                <refs nrefs="1-56 1-57 1-58"/>
            </w>
            <w n="1-44">
                <text>ἀλλήλοισι</text>
                <refs nrefs="1-59 1-60 1-61"/>
            </w>
            <w n="1-45">
                <text>.</text>
                <refs nrefs="1-62"/>
            </w>
        </wds>
        <wds lnum="L2">
            <comment class="uri"/>
            <w n="1-1">
                <text>This</text>
                <refs nrefs="1-5"/>
            </w>
            <w n="1-2">
                <text>is</text>
                <refs nrefs="1-5"/>
            </w>
            <w n="1-3">
                <text>the</text>
                <refs nrefs="1-4"/>
            </w>
            <w n="1-4">
                <text>display</text>
                <refs nrefs="1-4"/>
            </w>
            <w n="1-5">
                <text>of</text>
                <refs nrefs="1-3"/>
            </w>
            <w n="1-6">
                <text>the</text>
                <refs nrefs="1-3"/>
            </w>
            <w n="1-7">
                <text>inquiry</text>
                <refs nrefs="1-3"/>
            </w>
            <w n="1-8">
                <text>of</text>
                <refs nrefs="1-1"/>
            </w>
            <w n="1-9">
                <text>Herodotus</text>
                <refs nrefs="1-1"/>
            </w>
            <w n="1-10">
                <text>of</text>
                <refs nrefs="1-2"/>
            </w>
            <w n="1-11">
                <text>Halicarnassus</text>
                <refs nrefs="1-2"/>
            </w>
            <w n="1-12">
                <text>,</text>
                <refs nrefs="1-6"/>
            </w>
            <w n="1-13">
                <text>so</text>
                <refs nrefs="1-7"/>
            </w>
            <w n="1-14">
                <text>that</text>
                <refs nrefs="1-7"/>
            </w>
            <w n="1-15">
                <text>things</text>
                <refs nrefs="1-9 1-10"/>
            </w>
            <w n="1-16">
                <text>done</text>
                <refs nrefs="1-9 1-10"/>
            </w>
            <w n="1-17">
                <text>by</text>
                <refs nrefs="1-11"/>
            </w>
            <w n="1-18">
                <text>man</text>
                <refs nrefs="1-12"/>
            </w>
            <w n="1-19">
                <text>not</text>
                <refs nrefs="1-8"/>
            </w>
            <w n="1-20">
                <text>be</text>
                <refs nrefs="1-16"/>
            </w>
            <w n="1-21">
                <text>forgotten</text>
                <refs nrefs="1-15"/>
            </w>
            <w n="1-22">
                <text>in</text>
                <refs nrefs="1-13 1-14"/>
            </w>
            <w n="1-23">
                <text>time</text>
                <refs nrefs="1-13 1-14"/>
            </w>
            <w n="1-24">
                <text>,</text>
                <refs nrefs="1-17"/>
            </w>
            <w n="1-25">
                <text>and</text>
                <refs nrefs="1-18"/>
            </w>
            <w n="1-26">
                <text>that</text>
                <refs nrefs="1-7"/>
            </w>
            <w n="1-27">
                <text>great</text>
                <refs nrefs="1-20"/>
            </w>
            <w n="1-28">
                <text>and</text>
                <refs nrefs="1-21 1-22"/>
            </w>
            <w n="1-29">
                <text>marvelous</text>
                <refs nrefs="1-23"/>
            </w>
            <w n="1-30">
                <text>deeds</text>
                <refs nrefs="1-19"/>
            </w>
            <w n="1-31">
                <text>,</text>
                <refs nrefs="1-24"/>
            </w>
            <w n="1-32">
                <text>some</text>
                <refs nrefs="1-25 1-26"/>
            </w>
            <w n="1-33">
                <text>displayed</text>
                <refs nrefs="1-31"/>
            </w>
            <w n="1-34">
                <text>by</text>
                <refs nrefs="1-27"/>
            </w>
            <w n="1-35">
                <text>the</text>
                <refs nrefs="1-27"/>
            </w>
            <w n="1-36">
                <text>Hellenes</text>
                <refs nrefs="1-27"/>
            </w>
            <w n="1-37">
                <text>,</text>
                <refs nrefs="1-28 1-29"/>
            </w>
            <w n="1-38">
                <text>some</text>
                <refs nrefs="1-28 1-29"/>
            </w>
            <w n="1-39">
                <text>by</text>
                <refs nrefs="1-30"/>
            </w>
            <w n="1-40">
                <text>the</text>
                <refs nrefs="1-30"/>
            </w>
            <w n="1-41">
                <text>barbarians</text>
                <refs nrefs="1-30"/>
            </w>
            <w n="1-42">
                <text>,</text>
                <refs nrefs="1-32"/>
            </w>
            <w n="1-43">
                <text>not</text>
                <refs nrefs="1-18"/>
            </w>
            <w n="1-44">
                <text>lose</text>
                <refs nrefs="1-34"/>
            </w>
            <w n="1-45">
                <text>their</text>
                <refs nrefs="1-33"/>
            </w>
            <w n="1-46">
                <text>glory</text>
                <refs nrefs="1-33"/>
            </w>
            <w n="1-47">
                <text>,</text>
                <refs nrefs="1-35"/>
            </w>
            <w n="1-48">
                <text>including</text>
                <refs nrefs="1-36 1-37 1-38 1-39"/>
            </w>
            <w n="1-49">
                <text>among</text>
                <refs nrefs="1-36 1-37 1-38 1-39"/>
            </w>
            <w n="1-50">
                <text>others</text>
                <refs nrefs="1-36 1-37 1-38 1-39"/>
            </w>
            <w n="1-51">
                <text>what</text>
                <refs nrefs="1-40 1-41"/>
            </w>
            <w n="1-52">
                <text>was</text>
                <refs nrefs="1-40 1-41"/>
            </w>
            <w n="1-53">
                <text>the</text>
                <refs nrefs="1-42"/>
            </w>
            <w n="1-54">
                <text>cause</text>
                <refs nrefs="1-42"/>
            </w>
            <w n="1-55">
                <text>of</text>
                <refs nrefs="1-42"/>
            </w>
            <w n="1-56">
                <text>their</text>
                <refs nrefs="1-43"/>
            </w>
            <w n="1-57">
                <text>waging</text>
                <refs nrefs="1-43"/>
            </w>
            <w n="1-58">
                <text>war</text>
                <refs nrefs="1-43"/>
            </w>
            <w n="1-59">
                <text>on</text>
                <refs nrefs="1-44"/>
            </w>
            <w n="1-60">
                <text>each</text>
                <refs nrefs="1-44"/>
            </w>
            <w n="1-61">
                <text>other</text>
                <refs nrefs="1-44"/>
            </w>
            <w n="1-62">
                <text>.</text>
                <refs nrefs="1-45"/>
            </w>
        </wds>
    </sentence>
</aligned-text>
`;

const App = () => (
  <Alignment alignment={xml}>
    <Sentence n="1">
      <Segment lnum="L1" />
      <Segment lnum="L2" />
      <Collapse title="XML">
        <Xml />
      </Collapse>
    </Sentence>
  </Alignment>
);

export default App;
