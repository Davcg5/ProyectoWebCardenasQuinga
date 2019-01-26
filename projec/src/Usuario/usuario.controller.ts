import {Controller, Get, Res} from "@nestjs/common";
 import {UsuarioService} from "./usuario.service";

@Controller('Login')

export class UsuarioController {

    constructor(
        private readonly __usuarioService: UsuarioService
    ) {

    }

    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('inicioLogin/login');
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