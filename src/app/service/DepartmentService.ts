import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService {
    constructor(private departmentRepo: DepartmentRespository) {

    }
    async getAllDepartments() {
        return await this.departmentRepo.getAllDepartments();
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "CREATE_API_FAILED");
        }
    }

    async getDepartmentById(id: string) {
        const department=await this.departmentRepo.getDepartmentById(id);
        if(!department){
            throw(new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND))
        }
    }

    public async updateDepartmentById(id: string, departmentDetails: any) {
        try {        
            const save = await this.departmentRepo.updateDepartmentDetails(
                id,
                departmentDetails
            );
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "code-400");
        }
    }

    public async softDeleteDepartmentById(id: string) {
        return await this.departmentRepo.softDeleteDepartmentById(id);
    }
}