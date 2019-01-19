
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';
import {HaciendaEntity} from "./hacienda.entity";


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

    ],
    providers: [

    ],
    exports: [

    ]
})
export class HaciendaModule {
}
