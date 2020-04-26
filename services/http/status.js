module.exports = JSONResponse = (status, message, data = null) => {
  return { status, message, data };
};
