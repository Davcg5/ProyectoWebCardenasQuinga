import {Controller, Get, Res} from "@nestjs/common";
import {UsuarioService} from "../Usuario/usuario.service";
import {RolService} from "./rol.service";

@Controller('Administracion')
export class RolController {


    constructor(
        private readonly __rolService: RolService
    ) {

    }

    @Get('menu')
    admistracionMenuVis(
        @Res() response
    ) {
        response.render('');


    }


}