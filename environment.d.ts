export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_URL: string;
    }
  }
}