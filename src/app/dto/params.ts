import { IsUUID } from "class-validator";

export class paramsDto {
    
    @IsUUID()
    public id: string;

   
}