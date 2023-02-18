module.exports = {
  app: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_AGE: process.env.ACCESS_TOKEN_AGE,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    STORAGE_TYPE: process.env.STORAGE_TYPE,
  },
  mq: {
    RABBITMQ_SERVER: process.env.RABBITMQ_SERVER,
  },
  cache: {
    REDIS_HOST: process.env.RABBITMQ_SERVER,
  },
  storage: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
};
