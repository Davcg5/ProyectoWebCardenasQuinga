import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {TypeOrmModule} from '@nestjs/typeorm';

import {UsuarioEntity} from "./Usuario/usuario.entity";
import {HaciendaEntity} from "./hacienda/hacienda.entity";
import {RegionEntity} from "./Region/region.entity";
import {ParcelaEntity} from "./Parcela/parcela.entity";
import {SensorEntity} from "./Sensor/sensor.entity";
import {LecturaEntity} from "./Lectura/lectura.entity";
import {SubparcelaEntity} from "./Subparcela/subparcela.entity";
import {RolEntity} from "./rol/rol.entity";
import {RegionModule} from "./Region/region.module";
import {HaciendaModule} from "./hacienda/hacienda.module";

@Module({
    imports: [
        TypeOrmModule
            .forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'webproject',
                synchronize: true,
                dropSchema: false,
                entities: [
                    UsuarioEntity,
                    HaciendaEntity,
                    RegionEntity,
                    ParcelaEntity,
                    SensorEntity,
                    LecturaEntity,
                    SubparcelaEntity,
                    RolEntity
                ]
            }),
RegionModule,
        HaciendaModule
    ], // Modulos
    controllers: [AppController], // Controllers
    providers: [
        AppService
    ], // Servicios
})
export class AppModule {
}