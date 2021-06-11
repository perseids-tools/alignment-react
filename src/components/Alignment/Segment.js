import AlignmentContext from './alignment-context';

import Segment from '../Segment';

const AdditionalFieldsWithContext = () => (
  <AlignmentContext.Consumer>
    {({ json }) => <Segment json={json} />}
  </AlignmentContext.Consumer>
);

export default AdditionalFieldsWithContext;
