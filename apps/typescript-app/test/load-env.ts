const getDotEnvPath = (env: string | undefined) =>
  !env || env === 'integration' ? '.env' : '.env.test';

process.loadEnvFile(getDotEnvPath(process.env.NODE_ENV));
