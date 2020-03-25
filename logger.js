/* eslint-disable no-console */
module.exports = {
  info: (logMessage) => {
    console.log(
      JSON.stringify({
        ...JSON.parse(JSON.stringify({ ...logMessage, LEVEL: 'INFO' })),
      }),
    );
  },
  error: (errorMessage) => {
    console.error(
      JSON.stringify({
        ...JSON.parse(JSON.stringify({ ...errorMessage, LEVEL: 'ERROR' })),
      }),
    );
  },
  debug: (debugMessage) => {
    console.log(
      JSON.stringify({
        ...JSON.parse(JSON.stringify({ ...debugMessage, LEVEL: 'DEBUG' })),
      }),
    );
  },
};
