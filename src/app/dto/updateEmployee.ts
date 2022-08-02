import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public username: string;

    @IsOptional()
    @IsNumber()
    public experience: number;

    @IsOptional()
    @IsString()
    public departmentId: string;

    @IsOptional()
    @IsString()
    public password: string;

    
    @IsOptional()
    @IsString()
    public role: string;
   
    @IsOptional()
    @IsString()
    public status: string;

    @IsOptional()
    @IsString()
    public dateOfJoining: string;
}