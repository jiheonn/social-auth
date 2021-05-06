const proxy = require('express-http-proxy');

module.exports = (app) => {
  app.use('/proxy', proxy('http://localhost:3000', {
    proxyReqPathResolver: async (req) => {
      // return 'http://localhost:3000/upload?id=' + req.params.id;
      return 'http://localhost:3000/upload';
    },
    // proxyReqOptDecorator: (proxyReqOpts) => {
    //   const newProxyReqOpts = { ...proxyReqOpts };
    //   newProxyReqOpts.headers = { host: 'spacial hosts', apikey: 'spacial key' };
    //   newProxyReqOpts.rejectUnauthorized = false;
    //   return newProxyReqOpts;
    // },
  }));
};