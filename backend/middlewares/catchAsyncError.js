//error handling of async behavior in js
export const catchAsyncError = (theFunc) => {
  return (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};
