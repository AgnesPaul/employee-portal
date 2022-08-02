import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;
   
    @IsString()
    public status: string;

    @IsString()
    public dateOfJoining: string;
}