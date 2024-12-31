// utils/errorHandler.js
const errorHandler = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export { errorHandler };
