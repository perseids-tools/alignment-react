const Segment = ({ json }) => {
  console.log(json);
  window.json = json

  return (
    <span>hello world</span>
  );
};

export default Segment;
