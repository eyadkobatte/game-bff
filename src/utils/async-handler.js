const asyncUtil = (fn) => {
  const asyncUtilWrap = (...args) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
  return asyncUtilWrap;
};

module.exports = asyncUtil;
