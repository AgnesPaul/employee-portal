import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateAddressDto {
    @IsOptional()
    @IsUUID()
    public id: string;

    @IsOptional()
    @IsString()
    public line1: string;

    @IsOptional()
    @IsString()
    public line2: string;

    @IsOptional()
    @IsString()
    public state: string;

    @IsOptional()
    @IsString()
    public country: string;

    @IsOptional()
    @IsString()
    public pinCode: string;
}