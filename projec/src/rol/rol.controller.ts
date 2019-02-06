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
        private readonly __usuarioService: UsuarioService
    ) {

    }


    @Get('rol')
    rolBuscar(
        @Res() response,
        @Session() sesion
    ) {
        console.log(sesion);
        response.render('RolesCrear/roles', {});
    }


    @Get('crear-rol')
    async crearCrear(
        @Res() response,
        @Session() sesion
    ) {
        let roles: RolEntity[];
        roles = await
            this.__rolService.buscar();


        let usuario: UsuarioEntity[];
        usuario = await
            this.__usuarioService.buscar();


        response.render('RolesCrear/crear-roles', {
            arregloRoles: roles,
            arredloUsuarios: usuario

        });
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