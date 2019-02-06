import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";
import {RolEntity} from "../rol/rol.entity";
import {RolModules} from "../rol/rol.modules";
import {HaciendaModule} from "../hacienda/hacienda.module";


@Module({
    imports: [

        TypeOrmModule.forFeature([
            UsuarioEntity
        ]),HaciendaModule,RolModules

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