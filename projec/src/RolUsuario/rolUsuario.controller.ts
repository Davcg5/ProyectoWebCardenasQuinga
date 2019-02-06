import {Controller} from "@nestjs/common";
import {RolService} from "../rol/rol.service";
import {RolUsuarioService} from "./rolUsuario.service";

@Controller()
export class RolUsuarioController {

    constructor(
        private readonly __rolUsuarioService: RolUsuarioService
    ) {

    }


}