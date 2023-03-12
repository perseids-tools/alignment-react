import React from 'react';
import renderer from 'react-test-renderer';

import Segment from './Segment';

const sentence = {
  $: { n: '1' },
  wds: [
    {
      $: { lnum: 'L1' },
      comment: [{ $: { class: 'uri' } }],
      w: [
        { $: { n: '1-1' }, text: [{ _: 'A' }], refs: [{ $: { nrefs: '1-1' } }] },
        { $: { n: '1-2' }, text: [{ _: 'BC' }], refs: [{ $: { nrefs: '1-2 1-3' } }] },
        {
          $: { n: '1-3' },
          text: [{ _: 'D' }],
          comment: [{ _: 'Test', $: { class: 'mark' } }],
          refs: [{ $: { nrefs: '1-4' } }],
        },
        { $: { n: '1-4' }, text: [{ _: 'E' }], refs: [{ $: { nrefs: '1-4' } }] },
        { $: { n: '1-5' }, text: [{ _: 'F' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
        { $: { n: '1-6' }, text: [{ _: 'G' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
      ],
    },
    {
      $: { lnum: 'L2' },
      comment: [{ $: { class: 'uri' } }],
      w: [
        { $: { n: '1-1' }, text: [{ _: 'A' }], refs: [{ $: { nrefs: '1-1' } }] },
        { $: { n: '1-2' }, text: [{ _: 'B' }], refs: [{ $: { nrefs: '1-2' } }] },
        { $: { n: '1-3' }, text: [{ _: 'C' }], refs: [{ $: { nrefs: '1-2' } }] },
        { $: { n: '1-4' }, text: [{ _: 'DE' }], refs: [{ $: { nrefs: '1-3 1-4' } }] },
        { $: { n: '1-5' }, text: [{ _: 'F' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
        { $: { n: '1-6' }, text: [{ _: 'G' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
      ],
    },
  ],
};

it('renders a sentence', () => {
  const component = (
    <Segment lnum="L1" sentence={sentence} />
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('displays active words differently', () => {
  const active = {
    L1: new Set(['1-2']),
  };

  const component = (
    <Segment lnum="L1" sentence={sentence} active={active} />
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
