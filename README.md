# Alignment React

React library for displaying alignments.

Note that this library currently has an unstable API (version 0.x.x).

## Demo

[https://perseids-tools.github.io/alignment-react/](https://perseids-tools.github.io/alignment-react/)

## Installation

`yarn add alignment-react`

Note that this package has the following peer dependencies:

```json
{
  "react": "^16.0.0 || ^17.0.0"
}
```

(See project on [npm](https://www.npmjs.com/package/alignment-react).)

## How to use

### Demo

See the demo [App.js](/example/src/App/App.js).

### Example

```jsx
import {
  Alignment,
  Collapse,
  Sentence,
  Segment,
  Xml,
} from 'alignment-react';

import 'alignment-react/dist/index.css';

const xml = `
<aligned-text xmlns="http://alpheios.net/namespaces/aligned-text">
    <language lnum="L1" xml:lang="eng"/>
    <language lnum="L2" xml:lang="fra"/>
    <sentence n="1">
        <wds lnum="L1">
            <comment class="uri"/>
            <w n="1-1">
                <text>Hello</text>
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
                <text>Bonjour</text>
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
    <Sentence n="1">
      <Segment lnum="L1" />
      <Segment lnum="L2" />
      <Collapse title="XML">
        <Xml />
      </Collapse>
    </Sentence>
  </Alignment>
);

export default  App;
```

#### Alignment

The `<Alignment>` component accepts an XML document of an alignment as an `alignment` prop.
The other components should be children (or grandchildren, etc.) of the `<Alignment>` component.

#### Sentence

The `<Sentence>` component accepts a string `n` which represents the `n` of the
sentence to display.

#### Segment

The `<Segment>` component shows the text of one of the languages. It takes an `lnum` prop for
the `lnum` of the language to display.

#### Xml

The `<Xml>` component displays the XML of the sentence.

#### Collapse

The `<Collapse>` component is provided for convenience.
It is a button that displays or hides its children whenever it is clicked.

## Development

### Setup

```
git clone git@github.com:perseids-tools/alignment-react.git
```

then install development dependencies

```
yarn install
```

### Running tests

#### Unit tests

`yarn test`

### Running demo application

#### In one terminal window

`yarn start`

#### In another

```
cd example
yarn start
```

### Building

`yarn build`

### Deploying demo application

```
yarn build
yarn deploy
```

### Publishing

```
yarn build
npm publish
```

(Make sure to update the `version` in `package.json` before publishing a new release.)

## Upgrading Notes

This library was created using [create-react-library](https://www.npmjs.com/package/create-react-library) version 3.1.1.
See the documentation there for information about upgrading the underlying dependencies.
