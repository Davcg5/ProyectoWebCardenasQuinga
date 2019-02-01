import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';
import {UsuarioService} from "./Usuario/usuario.service";

@Controller('Login')
export class AppController {
    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }

    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('celula') celula: string,
        @Body('password') password: string,
        @Res() response,
        @Session() sesion
    ) {
        const identificado = await this._usuarioService

            .login(celula, password);

        if (identificado) {

            sesion.usuario = celula;

            response.redirect('/Rol/menuAdministrador')

        } else {
            throw new BadRequestException({mensaje: 'Error login'})
        }

    }

    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('inicioLogin/login');
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


