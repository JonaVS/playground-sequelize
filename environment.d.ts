export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_URL: string;
      JWT_KEY: string,
    }
  }
}