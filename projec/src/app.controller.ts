import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';
import {UsuarioService} from "./Usuario/usuario.service";
import {ok} from "assert";
import {RolService} from "./rol/rol.service";
import {RolEntity} from "./rol/rol.entity";

@Controller('Login')
export class AppController {
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolesService: RolService
    ) {

    }

    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('cedula') cedula: string,
        @Body('contraseña') contraseña: string,
        @Res() response,
        @Session() sesion
    ) {
        const identificado = await this._usuarioService
            .login(cedula, contraseña);


        if (identificado) {
            sesion.usuario = cedula;
            response.redirect('/Rol/menuAdministrador')

        } else {
            throw new BadRequestException({mensaje: 'Error login'})
        }

    }

    @Get('login')
    async loginVista(
        @Res() response
    ) {

        let roles: RolEntity[];
        roles = await this._rolesService.buscar();
        response.render('inicioLogin/login', {
                arregloRoles: roles
            }
        );
    }


    @Get('logout')
    logout(
        @Res() response,
        @Session() sesion,
    ) {
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/Login/login');

    }


    @Get('home')
    homeVista(
        @Res() response
    ) {
        response.render('inicioLogin/home')
    }


    @Get('acerca')
    acercaHome(
        @Res() response
    ) {
        response.render('inicioLogin/acerca')

    }

    @Get('contactanos')
    contactanosHome(
        @Res() response
    ) {
        response.render('inicioLogin/contactanos')

    }


}


