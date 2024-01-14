const {validationResult} = require('express-validator');
const {BAD_REQUEST} = require('../http-status-code');
const container = require('../../../container');

const isRequestValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({error: formatErrors(errors.array()[0])});
  }
  next();
};

const formatErrors = ({value, param}) => {
  const igGenerator = container.resolve('idGenerator');
  const code = igGenerator.generate();

  if (value) {
    return {
      message: `Provided value '${param}' has no correct format for field`,
      code,
    };
  }
  return {message: `Field '${param}' cannot be blank`, code};
};

module.exports = {isRequestValid};
