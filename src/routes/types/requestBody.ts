export type TypedRequestBody<T> = Express.Request & { body: T };
