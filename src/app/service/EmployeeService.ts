import { plainToClass } from "class-transformer";
import { EntityNotFoundError } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken"


export class EmployeeService {
    constructor(private employeeRepo: EmployeeRespository) {

    }
    async getAllEmployees() {
        return await this.employeeRepo.getAllEmployees();
    }

    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId,
                status:employeeDetails.status,
                role:employeeDetails.role,
                experience:employeeDetails.experience,
                dateOfJoining:employeeDetails.dateOfJoining,
                username: employeeDetails.username,
                password:employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10):'',
                // age: employeeDetails.age,
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", "CREATE_API_FAILED");
            throw(err)
        }
    }

    async getEmployeeById(id: string) {
        const employee = await this.employeeRepo.getEmployeeById(id);
        if(!employee){
            throw(new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND))
        }
        return employee
    }

    public async updateEmployeeById(id: string, employeeDetails: any) {
            // const employee = await this.employeeRepo.getEmployeeById(id);
            // if(!employee){
            //     throw(new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND))
            // }
            try {        
              const save = await this.employeeRepo.updateEmployeeDetails(
                id,
                employeeDetails
              );
              return save;
          } catch (err) {
              throw new HttpException(400, "Failed to Update Employee", "code-400");
          }
            
       
    }

    public async softDeleteEmployeeById(id: string) {
        const employee = await this.employeeRepo.softDeleteEmployeeById(id);
        // if(!employee){
        //   throw(new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND))
        // }
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
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
}