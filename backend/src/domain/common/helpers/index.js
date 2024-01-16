const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
};


const isBoolean = (value) => {
  return typeof value === 'boolean';
};

const isNull = (data) => {
  return data === null || data === undefined;
};

const isString = (value) => {
  return typeof value === 'string';
};

const isUUID = (value) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(value);
};

module.exports = {
  isNumber,
  isBoolean,
  isNull,
  isString,
  isUUID,
};
