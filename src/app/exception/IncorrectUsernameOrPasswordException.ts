import HttpException from "./HttpException";
import { ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor() {
    super(400, ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD.MESSAGE, ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;
