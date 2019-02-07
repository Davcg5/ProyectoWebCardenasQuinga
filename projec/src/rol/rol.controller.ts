import {Controller, Get, Res, Session} from "@nestjs/common";
import {UsuarioService} from "../Usuario/usuario.service";
import {RolService} from "./rol.service";
import {ExpressionStatement} from "typescript";
import {RolEntity} from "./rol.entity";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {RolesUsuario, RolUsuarioService} from "../RolUsuario/rolUsuario.service";
import {RolUsuarioEntity} from "../RolUsuario/rolUsuario.entity";
import {ParcelaService} from "../Parcela/parcela.service";
import {SubparcelaService} from "../Subparcela/subparcela.service";

@Controller('Rol')
export class RolController {


    constructor(
        private readonly __rolService: RolService,
        private readonly __rolUsuarioService: RolUsuarioService,


    ) {

    }

    @Get('menuAdministrador')
    async admistracionMenuVis(
        @Res()
            response,
        @Session()
            sesion
    ) {


        console.log(sesion);
        response.render('Administrador/menuAdministrador', {
            sessionUsuario: sesion.usuario
        });

    }




}