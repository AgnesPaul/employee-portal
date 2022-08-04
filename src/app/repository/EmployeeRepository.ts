import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { UpdateEmployeeDto } from "../dto/updateEmployee";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
    async getAllEmployees(): Promise<Employee[]> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations:['department','address']});
    }

    public async saveEmployeeDetails(employeeDetails: CreateEmployeeDto): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({
            where: {
                id: id,
            },
            relations: ['address']
        });
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails:UpdateEmployeeDto): Promise<Employee> {
        employeeDetails.id=employeeId
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save(    
            employeeDetails
        );
        return updateEmployeeDetails;
    }

    public async softDeleteEmployeeById(employee: Employee) :Promise<Employee>{
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(
            employee
        );
    }

    public async getEmployeeByUsername(username: string):Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username },
        });
        return employeeDetail;
    }
}
