module.exports = function cfgMongodb(env, cfg) {
  if (env.MONGOLAB_URI) {
    cfg.mongolab = {url: env.MONGOLAB_URI, uri: env.MONGOLAB_URI};
  }

  if (env.MONGOHQ_URL) {
    cfg.mongohq = {url: env.MONGOHQ_URL};
  }

  if (env.MONGODB_URL || env.MONGODB_SERVICE || cfg.mongolab || cfg.mongohq) {

    cfg.mongodb = {
      url: env.MONGODB_URL
        || (cfg.mongolab && cfg.mongolab.url)
        || (cfg.mongohq && cfg.mongohq.url),
      service: env.MONGODB_SERVICE || (cfg.mongolab && 'mongolab')
        || (cfg.mongohq && 'mongohq')
    };
  }
};