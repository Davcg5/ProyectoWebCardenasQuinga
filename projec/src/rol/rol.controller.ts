import {Controller, Get, Res} from "@nestjs/common";
import {UsuarioService} from "../Usuario/usuario.service";
import {RolService} from "./rol.service";

@Controller('Rol')
export class RolController {


    constructor(
        private readonly __rolService: RolService
    ) {

    }

    @Get('menuAdministrador')
    admistracionMenuVis(
        @Res() response
    ) {
        response.render('Administrador/menuAdministrador');
    }


}