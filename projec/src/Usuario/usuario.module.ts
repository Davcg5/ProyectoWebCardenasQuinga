import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";
import {RolEntity} from "../rol/rol.entity";
import {RolModules} from "../rol/rol.modules";


@Module({
    imports: [

        TypeOrmModule.forFeature([
            UsuarioEntity
        ]),RolModules


    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})


export class UsuarioModule {

}