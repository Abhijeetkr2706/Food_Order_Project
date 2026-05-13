


module.exports = (func) => (req, res, next) =>

  // Promise.resolve ensures that the function runs as a promise
  // so that any error inside async code can be caught
  Promise.resolve(func(req, res, next))

    // If any error happens, it will be passed to Express error middleware
    // using next(error)
    .catch(next);
