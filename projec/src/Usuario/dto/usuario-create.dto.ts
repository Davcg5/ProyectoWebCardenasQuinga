import {IsEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class UsuarioCreateDto {


    @IsNotEmpty()
    @IsString()
    @Length(3,30)
    nombre:string;

    @IsNotEmpty()
    @IsString()
    @Length(5,100)
    direccion:string;
    @IsNotEmpty()
    @IsString()
    @Length(10)
    cedula:string;

    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    password:string;

    @IsNotEmpty()
    @Length(9, 10)
    telefono:string;

    @IsNotEmpty()
    @IsNumber()
    hacienda:number

}