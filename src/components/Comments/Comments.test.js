import React from 'react';
import renderer from 'react-test-renderer';

import Comments from './Comments';

const sentence = {
  $: { n: '1' },
  wds: [
    {
      $: { lnum: 'L1' },
      w: [
        { $: { n: '1-1' }, text: [{ _: 'A' }], refs: [{ $: { nrefs: '1-1' } }] },
        { $: { n: '1-2' }, text: [{ _: 'BC' }], refs: [{ $: { nrefs: '1-2 1-3' } }] },
        {
          $: { n: '1-3' },
          text: [{ _: 'D' }],
          comment: [{ _: 'Test', $: { class: 'mark' } }],
          refs: [{ $: { nrefs: '1-3 1-4' } }],
        },
        { $: { n: '1-4' }, text: [{ _: 'E' }], refs: [{ $: { nrefs: '1-4' } }] },
        { $: { n: '1-5' }, text: [{ _: 'F' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
        { $: { n: '1-6' }, text: [{ _: 'G' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
      ],
    },
    {
      $: { lnum: 'L2' },
      w: [
        { $: { n: '1-1' }, text: [{ _: 'A' }], refs: [{ $: { nrefs: '1-1' } }] },
        { $: { n: '1-2' }, text: [{ _: 'B' }], refs: [{ $: { nrefs: '1-2' } }] },
        {
          $: { n: '1-3' },
          text: [{ _: 'C' }],
          comment: [{ _: 'Other languge test', $: { class: 'mark' } }],
          refs: [{ $: { nrefs: '1-3' } }],
        },
        { $: { n: '1-4' }, text: [{ _: 'DE' }], refs: [{ $: { nrefs: '1-3' } }] },
        { $: { n: '1-5' }, text: [{ _: 'F' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
        { $: { n: '1-6' }, text: [{ _: 'G' }], refs: [{ $: { nrefs: '1-5 1-6' } }] },
      ],
    },
  ],
};

it('does not render when there is no active', () => {
  const component = (
    <Comments sentence={sentence} />
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('does not render when the active has no comment', () => {
  const active = {
    selected: { lnum: 'L1', n: '1-1' },
    aligned: {
      L1: new Set(['1-1']),
      L2: new Set(['1-1']),
    },
  };

  const component = (
    <Comments
      sentence={sentence}
      active={active}
    />
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('displays all comments associated with active words', () => {
  const active = {
    selected: { lnum: 'L1', n: '1-1' },
    aligned: {
      L1: new Set(['1-3']),
      L2: new Set(['1-3', '1-4']),
    },
  };

  const component = (
    <Comments
      sentence={sentence}
      active={active}
    />
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
