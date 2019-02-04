import {IsEmpty, IsNotEmpty, IsString, Length} from "class-validator";

export class HaciendaCreateDto {

    @IsNotEmpty()
    @IsString()
    @Length(3,15)
    nombre:string;

    @IsNotEmpty()
    @IsString()
    @Length(5,100)
    direccion:string;

    @IsNotEmpty()
    @Length(9, 10)
    telefono:string;

}