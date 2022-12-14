import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";


const authorize = (permittedRoles: string[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {

    const token = getTokenFromRequestHeader(req);

    try {
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      
    } catch (error) {
      console.log(error)
      return next(new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED));
    }

    const data :any= jsonwebtoken.decode(token);
    try{ const decodedData = JSON.parse(JSON.stringify(data));
      if(!(permittedRoles.includes(decodedData.role))){
        throw new UserNotAuthorizedException(ErrorCodes.ROLENOTAUTHORIZED)
      }
    }catch{
      return next(new UserNotAuthorizedException(ErrorCodes.ROLENOTAUTHORIZED));
    }
      return next();

  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};

export default authorize;