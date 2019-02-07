import {Controller, Get, Res, Session} from "@nestjs/common";
import {HaciendaService} from "../hacienda/hacienda.service";
import {RegionService} from "../Region/region.service";
import {EncargadoService} from "./encargado.service";
import {ParcelaService} from "../Parcela/parcela.service";
import {SubparcelaService} from "../Subparcela/subparcela.service";

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
    historial(
        @Res()
            response,
        @Session()
            sesion
    ) {





        response.render('Encargado/historial', {});
    }

}