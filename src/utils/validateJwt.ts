import jwt from "jsonwebtoken";
import { UserJwtPayload } from "../types/UserJwtPayload.js";

type JwtPayload = jwt.JwtPayload & UserJwtPayload;

type JwtValidationResult = {
  decodedJwt: JwtPayload | null;
  errorMessage: string;
};

export const validateJwt = (token: string): JwtValidationResult => {
  let decodedJwt: JwtPayload | null = null;
  let errorMessage = "";
  jwt.verify( token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        errorMessage = err.message;
      } else {
        decodedJwt = payload as JwtPayload;
      }
    }
  );

  return {decodedJwt, errorMessage}
};
