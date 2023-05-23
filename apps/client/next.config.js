//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    LOCAL_BACKEND_URL: process.env.LOCAL_BACKEND_URL,
    CALENDAR_ID: process.env.CALENDAR_ID,
    API_KEY: process.env.API_KEY,
    OAUTH_KEY: process.env.OAUTH_KEY,
    OAUTH_SECRET: process.env.OAUTH_SECRET,
  },
};

module.exports = withNx(nextConfig);
