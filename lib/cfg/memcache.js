module.exports = function cfgMemcache(env, cfg) {
  if (env.MEMCACHIER_SERVERS || env.MEMCACHIER_USERNAME
    || env.MEMCACHIER_PASSWORD) {
    cfg.memcachier = {
      servers: env.MEMCACHIER_SERVERS && env.MEMCACHIER_SERVERS.split(/[,;]/g),
      username: env.MEMCACHIER_USERNAME,
      password: env.MEMCACHIER_PASSWORD
    };
  }

  if (env.MEMCACHEDCLOUD_SERVERS || env.MEMCACHEDCLOUD_USERNAME
    || env.MEMCACHEDCLOUD_PASSWORD) {
    cfg.memcachedcloud = {
      servers: env.MEMCACHEDCLOUD_SERVERS
        && env.MEMCACHEDCLOUD_SERVERS.split(/[,;]/g),
      username: env.MEMCACHEDCLOUD_USERNAME,
      password: env.MEMCACHEDCLOUD_PASSWORD
    };
  }

  if (env.MEMCACHE_SERVERS || env.MEMCACHE_SERVICE
    || env.MEMCACHE_USERNAME || env.MEMCACHE_PASSWORD
    || cfg.memcachier || cfg.memcachedcloud
    || env.DEFAULT_MEMCACHE) {

    var service = env.MEMCACHE_SERVICE && cfg[env.MEMCACHE_SERVICE]
      || cfg.memcachier || cfg.memcachedcloud;

    cfg.memcache = {
      servers: env.MEMCACHE_SERVERS && env.MEMCACHE_SERVERS.split(/[,;]/g)
        || service && service.servers
        || ['localhost:11211'],
      username: env.MEMCACHE_USERNAME
        || service && service.username,
      password: env.MEMCACHE_PASSWORD
        || service && service.password,
      service: env.MEMCACHE_SERVICE
        || cfg.memcachier && 'memcachier'
        || cfg.memcachedcloud && 'memcachedcloud'
    };
  }
};
