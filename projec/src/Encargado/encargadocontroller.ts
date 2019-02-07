import {Controller, Get, Res, Session} from "@nestjs/common";
import {HaciendaService} from "../hacienda/hacienda.service";
import {RegionService} from "../Region/region.service";
import {EncargadoService} from "./encargado.service";
import {ParcelaService} from "../Parcela/parcela.service";
import {SubparcelaService} from "../Subparcela/subparcela.service";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {RolEntity} from "../rol/rol.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";

@Controller('Encargado')
export class Encargadocontroller {

    constructor(
        private readonly _encargadoService: EncargadoService,
        private readonly _parcelaService: ParcelaService,
        private readonly _subparcelaService: SubparcelaService,
    ) {
    }


    @Get('menu')
    menuEncargado(
        @Res()
            response,
        @Session()
            sesion
    ) {
        console.log(sesion);
        response.render('Encargado/menuEncargado', {
            sessionUsuario: sesion.usuario
        });
    }

    @Get('notificaciones')
    notificaciones(
        @Res()
            response,
        @Session()
            sesion
    ) {
        response.render('Encargado/notificaciones', {
            sessionUsuario: sesion.usuario
        });
    }


    @Get('historial')
    async historial(
        @Res()
            response,
        @Session()
            sesion
    ) {

        let parcela: ParcelaEntity[];
        parcela = await
            this._parcelaService.buscar();

        let subparcela: SubparcelaEntity[];
        subparcela = await
            this._subparcelaService.buscar();

        response.render('Encargado/historial', {
            arregloparcela: parcela,
            arreglosubparcela: subparcela
        });
    }


    @Get('monitoreo')
    async monitoreo(
        @Res()
            response,
        @Session()
            sesion
    ) {

        let parcela: ParcelaEntity[];
        parcela = await
            this._parcelaService.buscar();

        let subparcela: SubparcelaEntity[];
        subparcela = await
            this._subparcelaService.buscar();

        response.render('Encargado/monitoreo', {
            arregloparcela: parcela,
            arreglosubparcela: subparcela
        });
    }

}