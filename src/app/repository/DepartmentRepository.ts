import { getConnection } from "typeorm";
import { CreateDepartmentDto } from "../dto/createDepartment";
import { UpdateDepartmentDto } from "../dto/updateDepartment";
import { Department } from "../entities/Department";

export class DepartmentRespository {
    async getAllDepartments() : Promise<Department[]>{
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }

    public async saveDepartmentDetails(departmentDetails: CreateDepartmentDto): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    async getDepartmentById(id: string): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne(id);
    }

    public async updateDepartmentDetails(id: string, departmentDetails: UpdateDepartmentDto) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update(
            { id: id, deletedAt: null },
            departmentDetails
        );
        return updateDepartmentDetails;
    }

    public async softDeleteDepartmentById(id: string){
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({
            id
        });
    }
}
