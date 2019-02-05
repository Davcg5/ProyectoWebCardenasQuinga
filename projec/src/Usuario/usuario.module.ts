
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';

import {RegionModule} from "../Region/region.module";
import {UsuarioEntity} from "./usuario.entity";
import {HaciendaModule} from "../hacienda/hacienda.module";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ]
            ),
        HaciendaModule
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
