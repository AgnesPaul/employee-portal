import { IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDto {
    @IsString()
    public name: string;

   
}