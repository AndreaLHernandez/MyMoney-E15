const httpError = (res, err) => {
  res
    .status(500)
    .send({ message: `Ha ocurrido un error en el servidor ${err.message}` });
};

const response = (message) => {
  return { message };
};

module.exports = { httpError, response };