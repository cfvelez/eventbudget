function JSONResponse(status, message, data = null) {
  return { status, message, data };
}

module.exports = { JSONResponse };
