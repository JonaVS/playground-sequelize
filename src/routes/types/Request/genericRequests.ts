import { Request } from "express";
import { ParamsDictionary} from 'express-serve-static-core';
import { BaseParam } from "../BaseParam.js";

//export type CreateRequest<T> = Request & { body: T };  If I use this, the body still shows as any.

//This is the same as the above but using interface and it seems to work.
export interface CreateRequest<T> extends Request { body: T };

export interface ParamsRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export interface GetByIdRequest extends ParamsRequest<BaseParam>{}
export interface DeleteByIdRequest extends ParamsRequest<BaseParam>{}
export interface UpdateByIdRequest<T> extends ParamsRequest<BaseParam> {
  body: T;
}

export interface LoginRequest<T> extends Request {body: T};
export interface AuthDeleteByIdRequest extends DeleteByIdRequest{
  body: {
    userId: string
  }
}