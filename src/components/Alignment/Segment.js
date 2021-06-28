import AlignmentContext from './alignment-context';

import Segment from '../Segment';

const AdditionalFieldsWithContext = ({ language }) => (
  <AlignmentContext.Consumer>
    {({ json, id, active, setActive }) => <Segment language={language} json={json} id={id} active={active} setActive={setActive} />}
  </AlignmentContext.Consumer>
);

export default AdditionalFieldsWithContext;
