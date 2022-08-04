import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { UpdateEmployeeDto } from "../dto/updateEmployee";
import { paramsDto } from "../dto/params";
import authorize from "../middleware/authorize";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();  
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`,
    authorize([APP_CONSTANTS.admin,APP_CONSTANTS.dev]),
    this.getAllEmployees);

    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      this.createEmployee);

    this.router.get(`${this.path}/:id`, 
    authorize([APP_CONSTANTS.admin,APP_CONSTANTS.dev]),
    validationMiddleware(paramsDto, APP_CONSTANTS.params),
    this.getEmployeeById);

    this.router.put(`${this.path}/:id`, 
    authorize([APP_CONSTANTS.admin]),
    validationMiddleware(paramsDto, APP_CONSTANTS.params),
    validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
    this.updateEmployeeById);

    this.router.delete(`${this.path}/:id`, 
    authorize([APP_CONSTANTS.admin]),
    validationMiddleware(paramsDto, APP_CONSTANTS.params),
    this.deleteEmployeeById);

    this.router.post(
      `${this.path}/login`,
      this.login
    );
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {

      const data = await this.employeeService.createEmployee(request.body); 
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };


  private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.updateEmployeeById(
        request.params.id,
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.softDeleteEmployeeById(
        request.params.id,
        
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
      const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.username.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
    }catch(err){
      next(err)
    }
    
  };
}

export default EmployeeController;
