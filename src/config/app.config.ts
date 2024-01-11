export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3002,
  mongodbUrl: process.env.MONDODB,

  defaultLimit: process.env.DEFAULT_LIMIT || 10,
})