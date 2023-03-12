import { parseString } from 'xml2js';

const xmlToJson = (xml) => {
  let json;
  parseString(xml, (_err, result) => {
    json = result;
  });

  return json;
};

// eslint-disable-next-line import/prefer-default-export
export { xmlToJson };
