import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken"
import { CreateEmployeeDto } from "../dto/createEmployee";
import { UpdateEmployeeDto } from "../dto/updateEmployee";


export class EmployeeService {
  constructor(private employeeRepo: EmployeeRespository) {
  }
  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepo.getAllEmployees();
  }

  public async createEmployee(employeeDetails: CreateEmployeeDto) {
    try {
      employeeDetails = { ...employeeDetails, password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '', }
      const save = await this.employeeRepo.saveEmployeeDetails(employeeDetails);
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create employee", "CREATE_API_FAILED");
      //throw(err)
    }
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepo.getEmployeeById(id);
    if (!employee) {
      throw (new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND))
    }
    return employee
  }

  public async updateEmployeeById(id: string, employeeDetails: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.getEmployeeById(id);
    if (!employee) {
      throw (new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND))
    }
    try {
      employeeDetails.address.id = employee.address.id;
      const save = await this.employeeRepo.updateEmployeeDetails(
        id,
        employeeDetails
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to Update Employee", "code-400");
    }


  }

  public async softDeleteEmployeeById(id: string): Promise<Employee> {
    const employeeDetail = await this.getEmployeeById(id)
    if (!employeeDetail) {
      throw (new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND))
    }
    const employee = await this.employeeRepo.softDeleteEmployeeById(employeeDetail);
    return employee
  }

  public employeeLogin = async (
    username: string,
    password: string
  ) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
      username
    );
    if (!employeeDetails) {
      throw new UserNotAuthorizedException(ErrorCodes.USER_NOT_FOUND);
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    if (validPassword) {
      let payload = {
        "id": employeeDetails.id,
        "name": employeeDetails.name,
        "role": employeeDetails.role
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }
  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}