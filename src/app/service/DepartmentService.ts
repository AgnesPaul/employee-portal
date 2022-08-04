import { CreateDepartmentDto } from "../dto/createDepartment";
import { UpdateDepartmentDto } from "../dto/updateDepartment";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService {
    constructor(private departmentRepo: DepartmentRespository) {

    }
    async getAllDepartments() : Promise<Department[]>{
        return await this.departmentRepo.getAllDepartments();
    }

    public async createDepartment(departmentDetails: CreateDepartmentDto) : Promise<Department> {
        try {
            const save = await this.departmentRepo.saveDepartmentDetails(departmentDetails);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "CREATE_API_FAILED");
        }
    }

    async getDepartmentById(id: string) : Promise<Department>{
        const department=await this.getDepartmentById(id);
        if(!department){
            throw(new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND))
        }
        return department
    }

    public async updateDepartmentById(id: string, departmentDetails: UpdateDepartmentDto) {
        const department = await this.getDepartmentById(id)
        if(!department){
            throw(new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND))
        }
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

    public async softDeleteDepartmentById(id: string): Promise<void> {
        const department=await this.getDepartmentById(id);
        if(!department){
            throw(new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND))
        }
        await this.departmentRepo.softDeleteDepartmentById(id);
    }
}