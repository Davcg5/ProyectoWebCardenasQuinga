import {Controller, Get, Res, Session} from "@nestjs/common";
import {UsuarioService} from "../Usuario/usuario.service";
import {RolService} from "./rol.service";
import {ExpressionStatement} from "typescript";
import {RolEntity} from "./rol.entity";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";

@Controller('Rol')
export class RolController {


    constructor(
        private readonly __rolService: RolService,
     ) {

    }


    @Get('menuAdministrador')
    admistracionMenuVis(
        @Res() response,
        @Session() sesion
    ) {
        console.log(sesion);
        response.render('Administrador/menuAdministrador', {
            sessionUsuario: sesion.usuario
        });
    }


}