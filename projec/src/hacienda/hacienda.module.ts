
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';
import {HaciendaEntity} from "./hacienda.entity";
import {HaciendaController} from "./hacienda.controller";
import {HaciendaService} from "./hacienda.service";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    HaciendaEntity
                ]
            )
    ],
    controllers: [
HaciendaController
    ],
    providers: [
HaciendaService
    ],
    exports: [
HaciendaService
    ]
})
export class HaciendaModule {
}
