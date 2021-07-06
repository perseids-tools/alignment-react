import AlignmentContext from './alignment-context';

import Segment from '../Segment';

const AdditionalFieldsWithContext = ({ lnum }) => (
  <AlignmentContext.Consumer>
    {({ json, id, active, setActive }) => <Segment lnum={lnum} json={json} id={id} active={active} setActive={setActive} />}
  </AlignmentContext.Consumer>
);

export default AdditionalFieldsWithContext;
